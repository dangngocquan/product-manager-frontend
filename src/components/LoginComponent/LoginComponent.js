import styles from './LoginComponent.module.scss';
import classNames from "classnames/bind";
import { motion } from 'framer-motion';
import SignIn from './SignIn';
import SignUp from './SignUp';
import services from "../../services";

const cx = classNames.bind(styles);


function LoginComponent({setToken}) {
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
                    className={cx("sign-in")}
                > 
                    <SignIn
                        setToken={setToken}
                    ></SignIn>
                </div>

                <div
                    className={cx("sign-up")}
                >
                    <SignUp></SignUp>
            
                </div>

            
            
            </motion.div>

        </div>
    )
}

export default LoginComponent;