import styles from './ProductVariations.module.scss';
import classNames from "classnames/bind";
import { motion } from 'framer-motion'; 
import { useEffect, useRef, useState } from 'react';
import Image from '../../Image';
import api from '../../../api';

const cx = classNames.bind(styles);


function ProductVariation({productVariations = [], product = null}) {
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
        var variantValueIds = [];
        variantNames.forEach(() => {
            variantValueNames.push([]);
            variantValueIds.push([]);
        });
        productVariations.forEach((productVariant) => {
            prices.push(productVariant['price']);

            var thisVariantNames = productVariant['variant_names'];

            var thisVariantValueNames = productVariant['variant_value_names'];
            thisVariantValueNames.forEach((variantValueName, variantValueIndex) => {
                var variantName = thisVariantNames[variantValueIndex];
                var index = variantNames.indexOf(variantName);
                variantValueNames[index].push(variantValueName);
            })

            var thisVariantValueIds = productVariant['variant_value_ids'];
            thisVariantValueIds.forEach((variantValueId, variantValueIndex) => {
                var variantName = thisVariantNames[variantValueIndex];
                var index = variantNames.indexOf(variantName);
                variantValueIds[index].push(variantValueId);
            })
        })

        variantValueNames.forEach((values, index) => {
            variantValueNames[index] = [...new Set(values)];
        })
        variantValueIds.forEach((ids, index) => {
            variantValueIds[index] = [...new Set(ids)];
        })

        return {
            productId,
            variantNames,
            variantValueNames,
            variantValueIds,
            prices
        };
    }

    function createVariantValuesStatus(objInfors) {
        if (objInfors == undefined || objInfors == null) {
            objInfors = infors;
        }
        var matrix = [];
        var selectedIds = [];
        objInfors.variantValueNames.forEach((rowVariantValueNames, index) => {
            matrix.push([]);
            rowVariantValueNames.forEach(() => {
                matrix[index] = [...matrix[index], 0];
            })
            selectedIds.push(-1);
        })

        return {
            status: matrix,
            selectedIds: selectedIds
        };
    }

    const [infors, setInfors] = useState(createObjInfors);


    // 0: value normal
    // 1: value selected
    // -1: value unable
    const [variantValuesStatus, setVariantValuesStatus] = useState(createVariantValuesStatus);

    if (infors.productId != product.id) { 
        var objInfors = createObjInfors();
        setInfors((prev) => objInfors);
        setVariantValuesStatus((prev) => createVariantValuesStatus(objInfors));
    }

    function handleAttributeValueOnClick(variantNameIndex, variantValueNameIndex) {
        return function () {
            var newVariantValuesStatus = {...variantValuesStatus};
            var status = newVariantValuesStatus["status"];
            var selectedIds = newVariantValuesStatus["selectedIds"];
            status[variantNameIndex].forEach((value, index) => {
                if (index == variantValueNameIndex) {
                    status[variantNameIndex][index] = 1;
                } else {
                    status[variantNameIndex][index] = 0;
                }
            })
            selectedIds[variantNameIndex] = infors["variantValueIds"][variantNameIndex][variantValueNameIndex];


            fillVariantValuesUnable(newVariantValuesStatus);

            setVariantValuesStatus((prev) => newVariantValuesStatus);
        }
    }

    function fillVariantValuesUnable(variantValuesStatus0, infors0) {
        if (variantValuesStatus0 == null || variantValuesStatus0 == undefined) {
            variantValuesStatus0 = variantValuesStatus
        }

        if (infors0 == null || infors0 == undefined) {
            infors0 = infors
        }

        var status = variantValuesStatus0["status"];
        var selectedIds = variantValuesStatus0["selectedIds"];
        var variantValueIds = infors0["variantValueIds"];

        console.log("selectedIds: " + selectedIds);

        for (var i = 0; i < status.length; i++) {
            for (var j = 0; j < status[i].length; j++) {
                if (status[i][j] == 1) continue;

                var selectedIds0 = [...selectedIds];
                selectedIds0[i] = variantValueIds[i][j];
                var isExistCase = productVariations.some((productVariant) => {
                    var variantValueIds0 = productVariant["variant_value_ids"];
                    return selectedIds0.every((id) => {
                        return variantValueIds0.includes(id) || id == -1;
                    })
                })
                console.log("row " + i + " column " + j + " isExistCase " + isExistCase)

                if (isExistCase) {
                    status[i][j] = 0;
                } else {
                    status[i][j] = -1;
                }
                
            }
        }
    }

    function getCurrentPrice() {
        for (var productVariant of productVariations) {
            var variantValueIds0 = productVariant['variant_value_ids'];
            var isSelected = variantValueIds0.every((id) => {
                return variantValuesStatus['selectedIds'].includes(id);
            });

            if (isSelected) return productVariant['price'];
        }
        return product.price;
    }

    console.log(infors);

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
                                                    {"attribute-value-selected": variantValuesStatus["status"][variantNameIndex][variantValueIndex] == 1},
                                                    {"attribute-value-unable": variantValuesStatus["status"][variantNameIndex][variantValueIndex] == -1} 
                                                )}
                                                key={variantValueIndex}
                                                onClick={
                                                    variantValuesStatus["status"][variantNameIndex][variantValueIndex] != -1?
                                                    handleAttributeValueOnClick(variantNameIndex, variantValueIndex) : () => {}
                                                }
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
                        getCurrentPrice()

                        
                    }
                </p>
            </div>
            
        </div>
    )
}

export default ProductVariation;