import styles from './ProductVariations.module.scss';
import classNames from "classnames/bind";
import { motion } from 'framer-motion'; 
import { useEffect, useState } from 'react';
import Image from '../../Image';
import api from '../../../api';

const cx = classNames.bind(styles);


function ProductVariation({productVariations=[]}) {
    if (productVariations.length == 0) {
        productVariations = [
            {
                "id": "1",
                "product_id": "1",
                "attributes": {
                    "defaultAttribute": "defaultAttributeValue"
                },
                "price": "104"
            }
        ]
    } 

    return (
        <div
            className={cx("wrapper")}
        >   

            {
                Object.keys(productVariations[0]["attributes"]).map((attribute, index) => {

                    return (
                        <div
                            className={cx("product-attribute")}
                            key={index}
                        >   
                            <div
                                className={cx("attribute-name")}
                            >
                                <p>{attribute}</p>
                            
                            </div>
                            

                            <ul
                                className={cx("attribute-values")}
                            >

                            {
                                productVariations.map((productVariation, index) => {
                                    return (
                                        <li
                                            className={cx("attribute-value")}
                                            key={index}
                                        >
                                            <p>{productVariation.attributes[attribute]}</p>
                                        
                                        </li>
                                        
                                    )
                                })
                            }

                            </ul>


                        </div>
                        
                    )
                })
            }
            
        </div>
    )
}

export default ProductVariation;