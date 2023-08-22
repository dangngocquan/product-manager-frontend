import styles from './Button.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


function Button({children}) {
    return (
        <button 
            className={cx("wrapper")}
        >
            {children}
        </button>
    )
}

export default Button;