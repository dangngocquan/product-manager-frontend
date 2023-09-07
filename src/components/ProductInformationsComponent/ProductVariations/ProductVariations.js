import styles from './ProductVariations.module.scss';
import classNames from "classnames/bind";
import { motion } from 'framer-motion'; 
import { memo, useEffect, useRef, useState } from 'react';
import Image from '../../Image';
import api from '../../../api';
import Icons from '../../Icon';
import Button from '../../Button';
import services from '../../../services';
import configs from '../../../configs';
import { useNavigate } from 'react-router-dom';
import { element } from 'prop-types';

const cx = classNames.bind(styles);


const ProductVariation = memo(function ProductVariation({productVariations = [], product = null}) {
    if (productVariations.length == 0) {
        productVariations = [
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
    if (product == null) {
        product = {
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
    }


    function handleAttributeValueOnClick(variantNameIndex, variantValueNameIndex) {
        return function () {
            var newVariantValuesStatus = {...variantValuesStatus};
            // update status and selected ids of variant value
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

            // update price and variantId
            var priceAndVariantId = services["productInformations"].getCurrentPriceAndVariantId(
                infors, productVariations, variantValuesStatus, product
            );

            newVariantValuesStatus["price"] = priceAndVariantId['price'];
            newVariantValuesStatus['variantId'] = priceAndVariantId['variantId'];

            services["productInformations"].fillVariantValuesUnable(
                newVariantValuesStatus, infors, productVariations
            );

            setVariantValuesStatus((prev) => newVariantValuesStatus);
        }
    }


    function increaseQuantity() {
        setQuantity((prev) => prev + 1);
    }

    function decreaseQuantity() {
        setQuantity((prev) => Math.max(prev - 1, 1));
    }


    function handleAddToCartOnClick() {
        if (sessionStorage.getItem(configs["sessionStorage"]["token"]) == null) {
            navigate(configs["routes"]["login"]);
        }

        refNotify.current.push({
            "element" : null,
            "notify-content": "Add product to cart successfully."
        });
        var size = refNotify.current.length;
        setTimeout(() => {
            refNotify.current[size-1]["element"].style.display = "none";
        }, 5000)
        console.log(refNotify);
        setRender((prev) => prev+1);

    }


    const [infors, setInfors] = useState(() => {
        return services["productInformations"].createObjInfors(productVariations, product);
    });

    // 0: value normal
    // 1: value selected
    // -1: value unable
    const [variantValuesStatus, setVariantValuesStatus] = useState(() => {
        return services["productInformations"].createVariantValuesStatus(infors);
    });

    const [quantity, setQuantity] = useState(1);

    if (infors.productId != product.id) { 
        var objInfors = services["productInformations"].createObjInfors(productVariations, product);
        setInfors((prev) => objInfors);
        setVariantValuesStatus((prev) => {
            return services["productInformations"].createVariantValuesStatus(objInfors);
        });
    }

    const navigate = useNavigate();

    const refNotify = useRef([]);
    const [render, setRender] = useState(0);

    console.log("render")

    return (
        <div
            className={cx("wrapper")}
        >   


            {
                refNotify.current.map((e, i) => {
                    return (
                        <div
                            className={cx("notify")}
                            ref={element => refNotify.current[i]['element'] = (element)}
                            key={i}
                        >
                            {refNotify.current[i]["notify-content"]}
                        </div>
                    )
                })
            }

            <div
                className={cx("variations")}
            >

                <p>{infors["variantNames"].length > 0? "Product Variants" : ""}</p>

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
                                                    variantValuesStatus["status"][variantNameIndex][variantValueIndex] == 0?
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
                className={cx("quantity")}
            >

                <p>Quantity</p>

                <div
                    className={cx('quantity-controller')}
                    onClick={decreaseQuantity}
                >
                    <Button>
                        {Icons.Minus}
                    </Button>
                </div>

                <div
                    className={cx("quantity-value")}
                >
                    {quantity}
                </div>

                <div
                    className={cx('quantity-controller')}
                    onClick={increaseQuantity}
                >
                    <Button>
                        {Icons.Plus}
                    </Button>
                    
                </div>

            </div>



            <div
                className={cx("price")}
            >
                <p>Price:</p>
                <p>
                    {product.currency}
                    {
                        variantValuesStatus['price']

                        
                    }
                </p>
            </div>



            <div
                className={cx("order-or-cart")}
            >
                <div
                    className={
                        cx(
                            "order-or-cart-item",
                            {"order-or-cart-not-active": infors["variantNames"].length > 0 && variantValuesStatus["variantId"] == -1}
                        )
                    }
                    onClick={
                        (infors["variantNames"].length > 0 && variantValuesStatus["variantId"] == -1)? 
                        () => {} : handleAddToCartOnClick
                    }
                >
                    {Icons.CartPlus}
                    <p>Add To Cart</p>
                </div>

                <div
                    className={
                        cx(
                            "order-or-cart-item",
                            {"order-or-cart-not-active": infors["variantNames"].length > 0 && variantValuesStatus["variantId"] == -1}
                        )
                    }
                >
                    {Icons.Cart}
                    <p>Buy Now</p>
                </div>
                
            </div>
            
        </div>
    )
})

export default ProductVariation;