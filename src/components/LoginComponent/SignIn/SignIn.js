import styles from './SignIn.module.scss';
import classNames from "classnames/bind";
import Icons from '../../Icon';
import { useId } from 'react';

const cx = classNames.bind(styles);


function SignIn() {
    const username = useId();
    const password = useId();

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
                    >
                        
                    </input>

                    <label
                        className={cx("field-label")}
                        htmlFor={username}
                    >
                        Username
                    </label>
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
                        placeholder='password'
                        id={password}
                    >
                    </input>

                    <label
                        className={cx("field-label")}
                        htmlFor={password}
                    >
                        Password
                    </label>
                </div>

            </div>
        </div>
    )
}

export default SignIn;