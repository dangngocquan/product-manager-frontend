import styles from './ProductInformations.module.scss';
import classNames from "classnames/bind";
import { motion } from 'framer-motion'; 
import { useEffect, useState } from 'react';
import Image from '../Image';
import api from '../../api';
import ProductVariation from './ProductVariations';
import ProductOptionals from './ProductOptionals/ProductOptionals';

const cx = classNames.bind(styles);


function ProductInformations() {
    var infors = {
        "products": [
            {
                "id": "1",
                "shop_id": "1",
                "name": "",
                "image": "default-product-image.png",
                "price": "",
                "currency": "",
                "stock": "",
                "time_added": "",
                "description": ""
            }
        ],
        "productsImages": [
            {
                "id": "1",
                "product_id": "1",
                "image": "default-product-image.png"
            }
        ],
        "productVariations": [
            {
                "id": "1",
                "product_id": "1",
                "attributes": {
                    "": ""
                },
                "price": ""
            }
        ]
    }


    const [productInformations, setProductInformations] = useState(infors);


    useEffect(() => {
        window.scrollTo(0, 0);
        api.products.getProductInformationsById(localStorage.getItem("productInformations"))
        .then((res) => {
            if (res.status == 200) {
                res.json()
                .then((res) => {
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
                            className={cx("product-image-showing")}
                        >
                            <Image imgName={productInformations.products[0].image}></Image>

                        </div>

                    </div>

                    <div
                        className={cx("product-content")}
                    >
                        <p>{productInformations.products[0].name}</p>
                        <p>{productInformations.products[0].currency}{productInformations.products[0].price}</p>
                        <p>{productInformations.products[0].description}</p>

                        <div
                            className={cx("product-variations")}
                        >
                            <ProductVariation
                                // productVariations={productInformations.productVariations}
                            >

                            </ProductVariation>

                        </div>

                        <div
                            className={cx("product-optionals")}
                        >
                            <ProductOptionals
                                
                            >

                            </ProductOptionals>

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