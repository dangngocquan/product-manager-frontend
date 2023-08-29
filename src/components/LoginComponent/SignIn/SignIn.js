import styles from './SignIn.module.scss';
import classNames from "classnames/bind";
import Icons from '../../Icon';
import { useEffect, useId, useRef, useState } from 'react';
import Button from '../../Button/Button';
import services from '../../../services';
import api from '../../../api';
import configs from "../../../configs";
import {Link} from 'react-router-dom';

const cx = classNames.bind(styles);


function SignIn({token, setToken, setComponentShowing}) {
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
                api.accounts.login(formData)
                    .then(function (res) {
                        if (res.status === 200) {
                            res.json()
                                .then((res) => {
                                    if (res.token == null) {
                                        setMessageLoginStatus((prev) => res.message);
                                        // console.log("End handle in promise");
                                    } else {
                                        setMessageLoginStatus((prev) => res.message);
                                        setToken((prev) => res.token);
                                        refBackHome.current.click();
                                        // console.log("Come to Home Page");
                                    }
                                })
                            
                        }
                    })
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
                        {isHiddenPassword? Icons.Eye : Icons.EyeInvisible}
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