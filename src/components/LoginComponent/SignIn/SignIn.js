import styles from './SignIn.module.scss';
import classNames from "classnames/bind";
import Icons from '../../Icon';
import { useEffect, useId, useRef, useState } from 'react';
import Button from '../../Button/Button';
import services from '../../../services';
import api from '../../../api';

const cx = classNames.bind(styles);


function SignIn() {
    const username = useId();
    const password = useId();

    const refUsername = useRef();
    const refPassword = useRef();

    const [messageUsername, setMessageUsername] = useState("");
    const [messagePassword, setMessagePassword] = useState("");
    const [messageLoginStatus, setMessageLoginStatus] = useState("");

    // const [response, setResponse] = useState({});

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

    function handleSubmit() {
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
                                    } else {
                                        setMessageLoginStatus((prev) => res.message);
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
            <div
                className={cx("heading")}
            > 
                Login
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
                        placeholder='username'
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
                        type="password"
                        placeholder='password'
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
                            <h1>LOGIN</h1>
                        </Button>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default SignIn;