import styles from './HomeComponent.module.scss';
import classNames from "classnames/bind";
import Slider from './Slider';

const cx = classNames.bind(styles);


function HomeComponent() {
    return (
        <div className={cx("wrapper")}>
            <Slider></Slider>
            <div className={cx("container")}></div>
        </div>
    )
}

export default HomeComponent;