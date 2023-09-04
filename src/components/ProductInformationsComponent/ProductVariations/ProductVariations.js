import styles from './ProductVariations.module.scss';
import classNames from "classnames/bind";
import { motion } from 'framer-motion'; 
import { useEffect, useRef, useState } from 'react';
import Image from '../../Image';
import api from '../../../api';

const cx = classNames.bind(styles);


function ProductVariation({productVariations = [], product = null}) {
    console.log("Product variant render");
    if (productVariations.length == 0) {
        productVariations = [
            {
                "id": "0",
                "price": "",
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
    if (product == null) {
        product = {
            "id": "0",
            "shop_id": "1",
            "name": "",
            "image": "default-product-image.png",
            "price": "",
            "currency": "",
            "stock": "",
            "time_added": "",
            "description": ""
        }
    }

    function createObjInfors() {
        var productId = product.id;

        var variantNames = [];
        productVariations.forEach((productVariant) => {
            variantNames = [...variantNames, ...productVariant['variant_names']];
        })
        variantNames = [...new Set(variantNames)];
        // console.log(variantNames);

        var prices = [];
        var variantValueNames = [];
        variantNames.forEach(() => {variantValueNames.push([])});
        productVariations.forEach((productVariant) => {
            prices.push(productVariant['price']);
            var thisVariantValueNames = productVariant['variant_value_names'];
            var thisVariantNames = productVariant['variant_names'];
            thisVariantValueNames.forEach((variantValueName, variantValueIndex) => {
                var variantName = thisVariantNames[variantValueIndex];
                var index = variantNames.indexOf(variantName);
                variantValueNames[index].push(variantValueName);
            })
        })
        variantValueNames.forEach((values, index) => {
            variantValueNames[index] = [...new Set(values)];
        })

        return {
            productId,
            variantNames,
            variantValueNames,
            prices
        };
    }

    function createMatrixVariantValuesStatus(objInfors) {
        if (objInfors == undefined || objInfors == null) {
            objInfors = infors;
        }
        var matrix = [];
        objInfors.variantValueNames.forEach((rowVariantValueNames, index) => {
            matrix.push([]);
            rowVariantValueNames.forEach(() => {
                matrix[index] = [...matrix[index], 0];
            })
        })
        return matrix;
    }

    const [infors, setInfors] = useState(createObjInfors);


    // 0: value normal
    // 1: value selected
    // -1: value unable
    const [variantValuesStatus, setVariantValuesStatus] = useState(createMatrixVariantValuesStatus);

    if (infors.productId != product.id) { 
        var objInfors = createObjInfors();
        setInfors((prev) => objInfors);
        setVariantValuesStatus((prev) => createMatrixVariantValuesStatus(objInfors));
    }

    function handleAttributeValueOnClick(variantNameIndex, variantValueNameIndex) {
        return function () {
            var newVariantValuesStatus = [...variantValuesStatus];
            newVariantValuesStatus[variantNameIndex].forEach((value, index) => {
                if (index == variantValueNameIndex) {
                    newVariantValuesStatus[variantNameIndex][index] = 1;
                } else {
                    newVariantValuesStatus[variantNameIndex][index] = 0;
                }
            })
            setVariantValuesStatus((prev) => newVariantValuesStatus);
        }
    }

    return (
        <div
            className={cx("wrapper")}
        >   

            <div
                className={cx("variantions")}
            >

                {
                    infors.variantNames.map((variantName, variantNameIndex) => {

                        return (
                            <div
                                className={cx("product-attribute")}
                                key={variantNameIndex}
                            >   
                                <div
                                    className={cx("attribute-name")}
                                >
                                    <p>{variantName}</p>
                                
                                </div>
                                

                                <ul
                                    className={cx("attribute-values")}
                                >

                                {
                                    infors.variantValueNames[variantNameIndex].map((variantValueName, variantValueIndex) => {
                            
                                        return (
                                            <li
                                                className={cx(
                                                    "attribute-value",
                                                    {"attribute-value-selected": variantValuesStatus[variantNameIndex][variantValueIndex] == 1} 
                                                )}
                                                key={variantValueIndex}
                                                onClick={handleAttributeValueOnClick(variantNameIndex, variantValueIndex)}
                                            >
                                                <p>{variantValueName}</p>
                                            
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


            <div
                className={cx("price")}
            >
                <p>Price:</p>
                <p>
                    {product.currency}
                    {
                        Object.keys(infors.variantNames).length == 0? product.price : 0

                        
                    }
                </p>
            </div>
            
        </div>
    )
}

export default ProductVariation;