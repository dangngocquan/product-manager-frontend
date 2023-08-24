import styles from './Image.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


function Image({imgName}) {
    return (
        <img 
            className={cx("wrapper")}
            src={`${window.location.origin}/assets/images/${imgName}`}
        >
        </img>
    )
}

export default Image;