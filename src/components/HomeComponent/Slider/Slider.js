import styles from './Slider.module.scss';
import classNames from "classnames/bind";
// import SliderImage from './SliderImage';
import { memo, useEffect, useState } from 'react';

const cx = classNames.bind(styles);


const Slider = memo(function Slider() {
    var images = [
                        "https://sonbetongconpa.vn/uploads/2019/04/retro-fashion-shop-design.jpg",
                        "https://media2.cgtrader.com/variants/NV74EzCg83YMBv6q3rAvhqkC/64d1262c1acde2eb3beef249c4695a8ad88c958dd79db36f763bf631017addd0/9c36161a-585e-4db0-90c7-e4c093bc4536.jpg"
                    ];
    
    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {
        console.log("call effect")
        const interval = setInterval(
            () => {
                setImgIndex(
                    (prev) => (prev+1) % images.length 
                );
            }, 
            20000);

        return () => clearInterval(interval);
    }, [])


    return (
        <div
            className={cx("wrapper")} 
            style={{
                backgroundImage: `url(${images[imgIndex]})`
            }}>

        </div>
    )
});

export default Slider;