import styles from './SliderImage.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


function SliderImage({image, display}) {
    return (
        <div 
            className={cx("wrapper")} 
            style={{
                backgroundImage: `url("${image}")`,
                display: display
            }}>

        </div>
    )
}

export default SliderImage;