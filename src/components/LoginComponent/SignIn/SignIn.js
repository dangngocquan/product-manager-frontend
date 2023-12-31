import styles from './SignIn.module.scss';
import classNames from "classnames/bind";
import Icons from '../../Icon';
import { useEffect, useId, useRef, useState } from 'react';
import Button from '../../Button/Button';
import services from '../../../services';
import api from '../../../api';
import configs from "../../../configs";
import {Link, useNavigate} from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const cx = classNames.bind(styles);


function SignIn({setComponentShowing}) {
    // console.log("Render");
    const username = useId();
    const password = useId();

    const refUsername = useRef();
    const refPassword = useRef();
    const refBackHome = useRef();

    const [messageUsername, setMessageUsername] = useState("");
    const [messagePassword, setMessagePassword] = useState("");
    const [messageLoginStatus, setMessageLoginStatus] = useState("");
    const [isHiddenPassword, setIsHiddenPassowd] = useState(true);

    const navigate = useNavigate();

    function handleFieldOnFocus() {
        if (messageUsername !== "") {
            setMessageUsername((prev) => "");
        }
        if (messagePassword !== "") {
            setMessagePassword((prev) => "");
        }
        if (messageLoginStatus !== "") {
            setMessageLoginStatus((prev) => "");
        }
    }

    function handleEyeOnClick() {
        setIsHiddenPassowd((prev) => !prev);
    }

    function handleComponentShowingOnClick() {
        setComponentShowing((prev) => 1-prev);
    }

    function handleSubmit() {
        // console.log("Start Handle Submit");
        const usernameChecker = services.isUserNameValid(refUsername.current.value);
        if (usernameChecker.isValid) {
            const passwordChecker = services.isPasswordValid(refPassword.current.value);
            if (passwordChecker.isValid) {
                var formData = {
                    "username": refUsername.current.value,
                    "password": refPassword.current.value
                }
                const submit = async () => {
                    await api.accounts.login(formData)
                    .then(function (res) {
                        if (res.status === 200) {
                            res.json()
                                .then((res) => {
                                    if (res.token == null) {
                                        setMessageLoginStatus((prev) => res.message);
                                        // console.log("End handle in promise");
                                    } else {
                                        setMessageLoginStatus((prev) => res.message);
                                        sessionStorage.setItem("token", res.token);
                                        // refBackHome.current.click();
                                        navigate(-1);
                                        // console.log("Come to Home Page");
                                    }
                                })
                            
                        }
                    })
                }
                submit();
                
            } else {
                if (messagePassword !== passwordChecker.message) {
                    setMessagePassword((prev) => passwordChecker.message);
                }
            }

        } else {
            if (messageUsername !== usernameChecker.message) {
                setMessageUsername((prev) => usernameChecker.message);
            }
        }
    }

    const handleGoogleLoginSuccess = (response) => {
        const submit = async () => {
            await api.accounts.loginWithGoogle({
                "token": response.credential
            })
            .then(function (res) {
                if (res.status === 200) {
                    res.json()
                        .then((res) => {
                            if (res.token == null) {
                                setMessageLoginStatus((prev) => res.message);
                                // console.log("End handle in promise");
                            } else {
                                setMessageLoginStatus((prev) => res.message);
                                sessionStorage.setItem("token", res.token);
                                // refBackHome.current.click();
                                navigate(-1);
                                // console.log("Come to Home Page");
                            }
                        })
                    
                } 
            })
        }
        submit();
    };
    const handleGoogleLoginFailed = (error) => {
        console.log(error);
    };

    return (
        <div
            className={cx("wrapper")}
        >

            <div
                className={cx("back-home")}
                onClick={() => {navigate(-1)}}
            >
                {Icons.ArrowLeft}
            </div>

            <div
                className={cx("heading")}
            > 
                Log in
            </div>

            <div
                className={cx("form")}
            >
                {/* username */}
                <div 
                    className={cx("field")}
                >
                    <div 
                        className={cx("field-icon")}
                    >
                        {Icons.User}
                    </div>

                    <input
                        className={cx("field-input")}
                        placeholder='Username'
                        id={username}
                        ref={refUsername}
                        onFocus={handleFieldOnFocus}
                    >
                        
                    </input>

                    <label
                        className={cx("field-label")}
                        htmlFor={username}
                    >
                        Username
                    </label>

                    <p
                        className={cx("field-message")}
                    >
                        {messageUsername}
                    </p>
                </div>

                {/* password */}
                <div 
                    className={cx("field")}
                >
                    <div 
                        className={cx("field-icon")}
                    >
                        {Icons.Password}
                    </div>

                    <input 
                        className={cx("field-input")}
                        type={isHiddenPassword? "password" : "text"}
                        placeholder='Password'
                        id={password}
                        ref={refPassword}
                        onFocus={handleFieldOnFocus}
                    >
                    </input>

                    <label
                        className={cx("field-label")}
                        htmlFor={password}
                    >
                        Password
                    </label>

                    <div 
                        className={cx("eye")}
                        onClick={handleEyeOnClick}
                    >
                        {isHiddenPassword? Icons.EyeInvisible : Icons.Eye}
                    </div>

                    <p
                        className={cx("field-message")}
                    >
                        {messagePassword}
                    </p>
                </div>



                {/* Message login status */}
                <p
                    className={cx("message-login-status")}
                >
                    {messageLoginStatus}
                </p>

                {/* Button submit */}
                <div 
                    className={cx("wrapper-submit")}
                >

                    <div
                        className={cx("submit")}
                        onClick={handleSubmit}
                    >
                        <Button>
                            <h1>Log in</h1>
                        </Button>

                    </div>

                </div>

                {/* Login social */}
                <div
                    className={cx("login-socials-title")}
                >
                    Or Log In With
                </div>

                <div
                    className={cx("socials")}
                >
                    <div
                        className={cx("social")}
                    >
                        {Icons.Google}
                        <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginFailed} />
                        
                    </div>
                </div>

            </div>

    


            {/* Don't have an account? Register Now */}
            <div
                className={cx("change-component")}
            >
                <p>Don't have an account? 
                    <span
                        onClick={handleComponentShowingOnClick}
                    >
                        Register Now
                    </span>
                </p> 
            </div>
        </div>
    )
}

export default SignIn;