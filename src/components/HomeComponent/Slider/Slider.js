import styles from './Slider.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


function Slider() {
    return (
        <div className={cx("wrapper")}>
            <h1>Slider</h1>
        </div>
    )
}

export default Slider;