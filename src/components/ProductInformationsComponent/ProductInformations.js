import styles from './ProductInformations.module.scss';
import classNames from "classnames/bind";
import { motion } from 'framer-motion'; 
import { memo, useEffect, useState } from 'react';
import Image from '../Image';
import api from '../../api';
import ProductVariation from './ProductVariations';
import Loader from '../Loader/Loader';

const cx = classNames.bind(styles);


const ProductInformations = memo(function ProductInformations() {
    
    var infors = {
        "products": [
            {
                "id": "0",
                "shop_id": "0",
                "name": "Product",
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
                    "default-product-image.png"
                ]
            }
        ],
        "productVariations": [
            {
                "id": "0",
                "price": "0",
                "variant_value_ids": [

                ],
                "variant_value_names": [

                ],
                "variant_ids": [

                ],
                "variant_names": [

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

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            setIsLoading(true);
            await api.products.getProductInformationsById(sessionStorage.getItem("productInformations"))
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
            setIsLoading(false);
        }
        fetchData();
    }, [])

    

    return (
        <div
            className={cx("wrapper")}
        >   

            <div
                className={cx(
                    "loader",
                    {"hidden": !isLoading}
                )}
            >
                <Loader></Loader>
            </div>




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
                                setIsLoading={setIsLoading}
                            >

                            </ProductVariation>

                        </div>

    

                    </div>


                    <div

                    >

                    </div>

                </div>
            </div>
            
            
        </div>
    )
})

export default ProductInformations;