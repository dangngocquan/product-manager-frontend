import styles from './AuthOTP.module.scss';
import classNames from "classnames/bind";
import {useNavigate} from 'react-router-dom';
import OTPBox from './OTPBox';
import { useEffect, useRef, useState } from 'react';
import api from '../../api';
import configs from '../../configs';

const cx = classNames.bind(styles);


function AuthOTP() {

    const navigate = useNavigate();

    const refInput = useRef([null, null, null, null, null, null]);
    const [indexOTPBox, setIndexOTPBox] = useState(0);


    function handleOtpBoxOnChange(index) {
        return function () {
            var text = refInput[index].value;
            if (text.length > 1) {
                text = text.substring(0, 1);
                refInput[index].value = text;
            }
            if (text.length == 1) {
                if (index == 5) {
                    // Submit OTP
                    api.accounts.signUp({
                        "email": sessionStorage.getItem("email"),
                        "otp": getOTPInput()
                    }).then(function (res) {
                        if (res.status === 201) {
                            // Created account, then login
                            const formData = {
                                "username": sessionStorage.getItem("username"),
                                "email": sessionStorage.getItem("email"),
                                "password": sessionStorage.getItem("password"),
                                "nickname": sessionStorage.getItem("nickname")
                            }
                            api.accounts.login(formData)
                                .then((res1) => res1.json())
                                .then((res1) => {
                                    sessionStorage.setItem("token", res1.token);
                                    sessionStorage.removeItem("username");
                                    sessionStorage.removeItem("email");
                                    sessionStorage.removeItem("password");
                                    sessionStorage.removeItem("nickname");
                                    navigate(configs.routes.home);
                                })
                        } else {
                            res.json()
                                .then((res) => {
                                    alert(res.message);
                                })
                        }
                    })
                } else {
                    refInput[index+1].focus();
                    setIndexOTPBox(prev => prev + 1);
                }
                
            } 
        }
    }

    function getOTPInput() {
        return refInput.current.reduce((accumulator, refOtpBox, index) => accumulator + refInput[index].value, "");
    }

    function clearCurrentOTP() {
        refInput.current.map((value, index) => {
            refInput[index].value = "";
        })
        refInput[0].focus();
        setIndexOTPBox(0);
    }

    function resendOTP() {
        const formData = {
            "username": sessionStorage.getItem("username"),
            "email": sessionStorage.getItem("email"),
            "password": sessionStorage.getItem("password"),
            "nickname": sessionStorage.getItem("nickname")
        }
        clearCurrentOTP();
        api.accounts.verifyEmail(formData)
            .then((res) => {
                res.json()
                    .then((res) => {
                        alert(res.message);
                    })
            });
    }

    useEffect(() => {
        refInput[0].focus();
        refInput.current.map((value, index) => {
            refInput[index].addEventListener("keydown", function(e){
                /*
                 * keyCode: 8
                 * keyIdentifier: "U+0008"
                */
                if(e.keyCode === 8) {
                    // e.preventDefault();
                    if (index > 0) {
                        const text = refInput[index].value;
                        if (text.length == 0) {
                            refInput[index - 1].focus();
                            setIndexOTPBox(index-1);
                        }
                    }
                }
            });
        })
        
    }, [])
    return (
        <div
            className={cx("wrapper")}
        >

            <div
                className={cx("container")}
            >

                <div
                    className={cx("title")}
                >
                    Enter OTP
                </div>

                <div
                    className={cx("description")}
                >
                    <p>
                        Please enter the 6-digit code that we have sent to your email
                        <span>{sessionStorage.getItem("email").replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2")}</span>
                    </p>
                    
                </div>

                <div
                    className={cx("otp-codes")}
                >
                    {
                        refInput.current.map((value, i) => {
                            return <div 
                                        className={cx("otp-box")}
                                        key={i}
                                    > 
                                        <OTPBox 
                                            onchange={handleOtpBoxOnChange(i)}
                                            innerRef={refInput}
                                            index={i}
                                        ></OTPBox> 
                                    </div>
                        })
                    }
                    
                    
                </div>

                <div
                    className={cx("resend")}
                >
                    <p>Haven't received a code yet? 
                        <span
                            onClick={resendOTP}
                        >
                            Resend
                        </span></p>
                </div>


            </div>
            
             
        </div>
    )
}

export default AuthOTP;