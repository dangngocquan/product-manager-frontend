import styles from './LoginComponent.module.scss';
import classNames from "classnames/bind";
import SignIn from './SignIn';
import SignUp from './SignUp';

const cx = classNames.bind(styles);


function LoginComponent({setToken}) {
    return (
        <div
            className={cx("wrapper")}
        >
            <div
                className={cx("container")}
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

            
            
            </div>

        </div>
    )
}

export default LoginComponent;