import styles from './Slider.module.scss';
import classNames from "classnames/bind";
import { memo, useEffect, useState } from 'react';
import Image from '../../Image/Image';
import api from '../../../api';


const cx = classNames.bind(styles);


const Slider = memo(function Slider() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        api.sliders.getSliders()
            .then(function (response) {
                setImages((prev) => response.sliders.sliders);
            });
    }, []);

    
    
    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(
            () => {
                setImgIndex(
                    (prev) => {
                        if (images.length > 0) {
                            return (prev+1) % images.length;
                        } else {
                            return 1;
                        }
                        
                    }
                );
            }, 
            20000);

        return () => clearInterval(interval);
    }, [images])


    return (
        <div
            className={cx("wrapper")} 
        >
                
            <div
                className={cx("image")}
            >   
                {
                    images.map((image, index) => {
                        if (index == imgIndex) {
                            return (
                                <Image
                                    key={image.id}
                                    imgName={image.image}
                                >

                                </Image>
                            )
                        }
                    } )
                }
                
            </div>
          
        </div>
    )
});

export default Slider;