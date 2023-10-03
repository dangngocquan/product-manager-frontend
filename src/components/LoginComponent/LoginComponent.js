import styles from './LoginComponent.module.scss';
import classNames from "classnames/bind";
import { motion } from 'framer-motion';
import SignIn from './SignIn';
import SignUp from './SignUp';
import services from "../../services";
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);


function LoginComponent() {
    const [componentShowing, setComponentShowing] = useState(0); // 0: Sign In, 1: Sign Up, 2: Verify OTP


    return (
        <div
            className={cx("wrapper")}
        >
            <motion.div
                className={cx("container")}
                variants={services.routeAnimations.login.container}
                initial="offscreen"
                whileInView="onscreen"
            >
                <div
                    className={
                        cx(
                            "sign-in",
                            {"container-in": componentShowing == 0},
                            {"container-out": componentShowing != 0}
                        )
                    }
                > 
                    <SignIn
                        componentShowing={componentShowing}
                        setComponentShowing={setComponentShowing}
                    >

                    </SignIn>
                </div>

                <div
                    className={
                        cx(
                            "sign-up",
                            {"container-in": componentShowing == 1},
                            {"container-out": componentShowing != 1}
                        )
                    }
                >
                    <SignUp
                        componentShowing={componentShowing}
                        setComponentShowing={setComponentShowing}
                    >
        
                    </SignUp>
            
                </div>
            
            
            </motion.div>

        </div>
    )
}

export default LoginComponent;