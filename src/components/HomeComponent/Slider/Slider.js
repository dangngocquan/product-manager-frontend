import styles from './Slider.module.scss';
import classNames from "classnames/bind";
// import SliderImage from './SliderImage';
import { memo, useEffect, useState } from 'react';
import Image from '../../Image/Image';

const cx = classNames.bind(styles);


const Slider = memo(function Slider() {
    var images = [
                        "img1692869536.983504.jpg",
                        "img1692869656.217982.jpg",
                        "img1692869689.628057.jpg",
                        "img1692869732.483874.jpg",
                        "img1692869803.582667.jpg"
                    ];
    
    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {
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
        >
            {
                images.map((image, index) => {
                    return (
                        <div
                            className={cx("image")}
                            key={index}
                            style={{
                                display: (index == imgIndex)? "block" : "none"
                            }}
                        >
                            <Image 
                                imgName={image}
                            >
                            </Image>
                        </div>
                    )
                    
                })
            }
        </div>
    )
});

export default Slider;