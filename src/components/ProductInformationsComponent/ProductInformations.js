import styles from './ProductInformations.module.scss';
import classNames from "classnames/bind";
import { motion } from 'framer-motion'; 
import { useState } from 'react';
import Image from '../Image';

const cx = classNames.bind(styles);


function ProductInformations() {
    window.scrollTo({
        top: 0, 
        behavior: "smooth" 
    })


    var product = {
        "id": "12",
        "shop_id": "1",
        "name": "Dell Latitude 9440 2-in-1, i7, 512GB SSD, 16GB RAM",
        "image": "default-product-image.png",
        "price": "59",
        "currency": "$",
        "stock": "100",
        "time_added": "1692866343.738955",
        "description": "Maximum performance and scalability. Ultimate security to work from anywhere. Innovating with sustainability."
    }

    

    return (
        <div
            className={cx("wrapper")}
        >   

            <div
                className={cx("container")}
            >

                <div
                    className={cx("product-main")}
                >

                    <div
                        className={cx("product-media")}
                    >
                        <div
                            className={cx("product-image-showing")}
                        >
                            <Image imgName={product.image}></Image>

                        </div>

                    </div>

                    <div
                        className={cx("product-content")}
                    >
                        <p>{product.name}</p>
                        <p>{product.currency}{product.price}</p>
                        <p>{product.description}</p>

                        <div
                            className={cx("product-variants")}
                        >

                        </div>

                        <div
                            className={cx("product-options")}
                        >

                        </div>

                    </div>

                </div>

                <div
                    className={cx("product-details")}
                >

                </div>
            </div>
            
            
        </div>
    )
}

export default ProductInformations;