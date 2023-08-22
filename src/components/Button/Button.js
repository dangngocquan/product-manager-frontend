import styles from './Button.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


function Button({children}) {
    return (
        <div className={cx("wrapper")}>
            {children}
        </div>
    )
}

export default Button;