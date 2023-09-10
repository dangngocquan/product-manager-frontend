import styles from './Loader.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


function Loader({imgName}) {
    return (
        <span class="loader"></span>
    )
}

export default Loader;