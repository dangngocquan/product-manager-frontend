import styles from './ProductInformations.module.scss';
import classNames from "classnames/bind";
import { motion } from 'framer-motion'; 
import { memo, useEffect, useState } from 'react';
import Image from '../Image';
import api from '../../api';
import ProductVariation from './ProductVariations';

const cx = classNames.bind(styles);


const ProductInformations = memo(function ProductInformations() {
    var infors = {
        "products": [
            {
                "id": "0",
                "shop_id": "0",
                "name": "product",
                "image": "default-product-image.png",
                "price": "0",
                "currency": "$",
                "stock": "0",
                "time_added": "0",
                "description": "none"
            }
        ],
        "productsImages": [
            {
                "images": [
                    "img1693845778.184802.jpg"
                ]
            }
        ],
        "productVariations": [
            {
                "id": "0",
                "price": "459",
                "variant_value_ids": [
                    "1",
                    "2",
                    "3"
                ],
                "variant_value_names": [
                    "value 1",
                    "value 2",
                    "value 3"
                ],
                "variant_ids": [
                    "1",
                    "2",
                    "3"
                ],
                "variant_names": [
                    "variant 1",
                    "variant 2",
                    "variant 3"
                ]
            }
        ]
    }

    function handleProductImageOnClick(imageIndex) {
        return () => {
            setImageIndex((prev) => imageIndex);
        }
    }


    const [productInformations, setProductInformations] = useState(infors);

    const [imageIndex, setImageIndex] = useState(0);


    useEffect(() => {
        window.scrollTo(0, 0);
        api.products.getProductInformationsById(localStorage.getItem("productInformations"))
        .then((res) => {
            if (res.status == 200) {
                res.json()
                .then((res) => {
                    if (res.informations.productsImages.length == 0) {
                        res.informations.productsImages = [{
                            "images": []
                        }];
                    }
                    setProductInformations((prev) => res.informations);
                })
            }
        })
    }, [])

    

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
                            className={cx("product-image-showing-wrapper")}
                        >
                            <div
                                className={cx("product-image-showing")}
                            >
                                <Image 
                                    imgName={
                                        [
                                            productInformations["products"][0]["image"], 
                                            ...productInformations["productsImages"][0]["images"]
                                        ][imageIndex]
                                    }
                                >

                                </Image>

                            </div>

                        </div>

                        <div
                            className={cx("product-images")}
                        >
                            {
                                [
                                    productInformations["products"][0]["image"], 
                                    ...productInformations["productsImages"][0]["images"]
                                ].map((image, index) => {
                                    return (
                                        <div
                                            className={cx("product-image-wrapper")}
                                            key={index}
                                        > 
                                            <div
                                                className={
                                                    cx(
                                                        "product-image",
                                                        {"product-image-selected": index == imageIndex}
                                                    )
                                                }
                                                onClick={handleProductImageOnClick(index)}
                                            >
                                                <Image
                                                    imgName={image}
                                                ></Image>

                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>


                    </div>

                    

                    <div
                        className={cx("product-content")}
                    >
                        <p>{productInformations.products[0].name}</p>
                        <p>{productInformations.products[0].description}</p>

                        <div
                            className={cx("product-variations")}
                        >
                            <ProductVariation
                                productVariations={productInformations.productVariations}
                                product={productInformations.products[0]}
                            >

                            </ProductVariation>

                        </div>

    

                    </div>


                    <div

                    >

                    </div>

                </div>

                <div
                    className={cx("product-details")}
                >

                </div>
            </div>
            
            
        </div>
    )
})

export default ProductInformations;