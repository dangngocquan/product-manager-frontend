import styles from './Loader.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


function Loader({imgName}) {
    return (
        <div
            className={cx("loader")}
        >

        </div>
    )
}

export default Loader;