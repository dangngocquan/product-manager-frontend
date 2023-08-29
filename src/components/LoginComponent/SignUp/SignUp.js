import styles from './SignUp.module.scss';
import classNames from "classnames/bind";
import Icons from '../../Icon';
import { useEffect, useId, useRef, useState } from 'react';
import Button from '../../Button/Button';
import services from '../../../services';
import api from '../../../api';
import configs from "../../../configs";
import {Link} from 'react-router-dom';

const cx = classNames.bind(styles);


function SignUp({setComponentShowing}) {
    // console.log("Render");
    const username = useId();
    const password = useId();
    const confirmPassword = useId();

    const refUsername = useRef();
    const refPassword = useRef();
    const refConfirmPassword = useRef();
    const refBackHome = useRef();

    const [messageUsername, setMessageUsername] = useState("");
    const [messagePassword, setMessagePassword] = useState("");
    const [messageConfirmPassword, setMessageConfirmPassword] = useState("");
    const [messageLoginStatus, setMessageLoginStatus] = useState("");
    const [isHiddenPassword, setIsHiddenPassword] = useState(true);
    const [isHiddenConfirmPassword, setIsHiddenConfirmPassword] = useState(true);

    function handleFieldOnFocus() {
        if (messageUsername !== "") {
            setMessageUsername((prev) => "");
        }
        if (messagePassword !== "") {
            setMessagePassword((prev) => "");
        }
        if (messageConfirmPassword !== "") {
            setMessageConfirmPassword((prev) => "");
        }
        if (messageLoginStatus !== "") {
            setMessageLoginStatus((prev) => "");
        }
    }

    function handleEyeOnClick() {
        setIsHiddenPassword((prev) => !prev);
    }

    function handleEyeOnClick2() {
        setIsHiddenConfirmPassword((prev) => !prev);
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
                if (refPassword.current.value == refConfirmPassword.current.value) {
                    var formData = {
                        "username": refUsername.current.value,
                        "password": refPassword.current.value,
                        "nickname": refUsername.current.value
                    }
                    api.accounts.signUp(formData)
                        .then(function (res) {
                            if (res.status === 201) {
                                // Created account, then login
                                api.accounts.login(formData)
                                    .then((res1) => res1.json())
                                    .then((res1) => {
                                        localStorage.setItem("token", res1.token);
                                        refBackHome.current.click();
                                    })
                            } else {
                                res.json()
                                    .then((res) => {
                                        setMessageLoginStatus((prev) => res.message);
                                    })
                            }
                        })

                } else {
                    if (messagePassword !== "Password and confirm password don't match.") {
                        setMessageConfirmPassword((prev) => "Password and confirm password don't match.");
                    }
                }
                
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

    return (
        <div
            className={cx("wrapper")}
        >

            <Link
                className={cx("back-home")}
                to={configs.routes.home}
                ref={refBackHome}
            >
                {Icons.Home}
            </Link>

            <div
                className={cx("heading")}
            > 
                Sign Up
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
                        {isHiddenPassword? Icons.Eye : Icons.EyeInvisible}
                    </div>

                    <p
                        className={cx("field-message")}
                    >
                        {messagePassword}
                    </p>
                </div>




                {/* Confirm password */}
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
                        type={isHiddenConfirmPassword? "password" : "text"}
                        placeholder='Confirm password'
                        id={confirmPassword}
                        ref={refConfirmPassword}
                        onFocus={handleFieldOnFocus}
                    >
                    </input>

                    <label
                        className={cx("field-label")}
                        htmlFor={confirmPassword}
                    >
                        Confirm password
                    </label>

                    <div 
                        className={cx("eye")}
                        onClick={handleEyeOnClick2}
                    >
                        {isHiddenConfirmPassword? Icons.Eye : Icons.EyeInvisible}
                    </div>

                    <p
                        className={cx("field-message")}
                    >
                        {messageConfirmPassword}
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
                            <h1>Register</h1>
                        </Button>

                    </div>

                </div>

            </div>


            {/* Don't have an account? Register Now */}
            <div
                className={cx("change-component")}
            >
                <p>Already have an account?  
                    <span
                        onClick={handleComponentShowingOnClick}
                    >
                        Login Now
                    </span>
                </p> 
            </div>
        </div>
    )
}

export default SignUp;