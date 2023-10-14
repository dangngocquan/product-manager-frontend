
import styles from './OTPBox.module.scss';
import classNames from "classnames/bind";


const cx = classNames.bind(styles);


function OTPBox({onchange, innerRef, index}) {
    return (
        <div 
            className={cx("wrapper")}
        >
            <input
                className={cx("input")}
                type='text'
                onChange={onchange}
                ref={(element) => innerRef[index] = element}
            >
            </input>
           
        </div>
    )
}

export default OTPBox;