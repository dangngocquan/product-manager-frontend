import styles from './ProductsComponent.module.scss';
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from 'react';
import {motion, sync} from 'framer-motion';
import api from '../../api';
import services from '../../services';
import Loader from '../Loader';
import NavCategories from './NavCategories';
import configs from '../../configs';
import { Link, redirect } from 'react-router-dom';
import Product from './Product/Product';
import Icon from '../Icon';
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';

const cx = classNames.bind(styles);


function ProductsComponent() {
    const [data, setData] = useState([]);
    const [productArray, setProductArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [orderSort, setOrderSort] = useState((new URLSearchParams(window.location.search)).get('order') == undefined?
        0 : (new URLSearchParams(window.location.search)).get('order'));
    const [sortBy, setSortBy] = useState((new URLSearchParams(window.location.search)).get('order') == undefined? 
        "default" : (new URLSearchParams(window.location.search)).get('sortBy'));

    const refs = useRef(productArray.map((product) => null));

    console.log(productArray);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await api.categories.getCategoryTree(0)
                .then(function (response) {
                    setData((prev) => response.categories.categoriesTree);
                })
            setIsLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await api.products.getProductsByCategoryId(
                (new URLSearchParams(window.location.search)).get('categoryId'),
                (new URLSearchParams(window.location.search)).get('page'),
                (new URLSearchParams(window.location.search)).get('order'),
                (new URLSearchParams(window.location.search)).get('sortBy')
            ).then((res) => {
                if (res != null && res != undefined) {
                    if (res.products.products.length === 0) {
                        res.products.products = [{
                            "images": []
                        }];
                    }
                    console.log(res)
                    setProductArray((prev) => res.products.products);
                        
                }
            })
            setIsLoading(false);
        }
            fetchData();
    }, []);

    function orderSortOnClick(e) {
        setOrderSort((prev) => 1 - prev);
    }

    function sortByOptionOnClick(e) {
        if (e.target.value != (sortBy == "default"? 1 : sortBy == "price"? 2 : 3)) {
            console.log(e.target.value);
            setSortBy(e.target.value == 1? "default" : e.target.value == 2? "price" : "name");
            window.location.replace(
                configs.routes.products 
                + `?categoryId=${
                    (new URLSearchParams(window.location.search)).get('categoryId') == undefined? 
                    0 :  (new URLSearchParams(window.location.search)).get('categoryId')}` 
                + `&page=${0}`
                + `&order=${orderSort}`
                + `&sortBy=${e.target.value == 1? "default" : e.target.value == 2? "price" : "name"}`
            )
        }
    }

    return (
        <div className={cx("wrapper")}>

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
                    className={cx("categories-list")}
                >

                    <div
                        className={cx("categories-list-title")}
                    >
                        <p>ALL CATEGORIES</p>
                    
                    </div>

                    <div
                        className={cx("categories-list-items")}
                    >
                        {
                            data.map((category, index) => {
                                return (
                                    <div
                                        className={cx("categories-list-item")}
                                        key={index}
                                    >
                                        <div
                                            className={cx("categories-list-item-name")}
                                        >
                                            {category.name}
                                            <Link
                                                className={cx("link")}
                                                to={configs.routes.products 
                                                    + `?categoryId=${category.id}` 
                                                    + `&page=${0}`
                                                    + `&order=${orderSort}`
                                                    + `&sortBy=${"default"}`}
                                            >
                                                
                                            </Link>
                                        </div>
                                        <div
                                            className={cx(
                                                "categories-list-item-children",
                                                {"hidden": true})
                                            }
                                        >
                                            <NavCategories
                                                categories={category.children}
                                            >
                                            </NavCategories>
                                        </div>
                                    </div>
                                    
                                )
                            })
                        }
                    </div>

                </div>






                <div
                    className={cx("products-view")}
                >
                    <div
                        className={cx("products-view-filter")}
                    >
                        <div
                            className={cx("products-view-sort-by")}
                        >
                            <div
                                className={cx("label")}
                            >
                                Sort by
                            </div>
                            <select
                                className={cx("products-view-sort-by-select")}
                                onClick={sortByOptionOnClick}
                                defaultValue={sortBy == "default"? 1 : sortBy == "price"? 2 : 3}
                            >
                                <option className={cx("option")} value="1">Position</option>
                                <option className={cx("option")} value="2">Price</option>
                                <option className={cx("option")} value="3">Product name</option>
                            </select>
                        </div>

                        <div
                            className={cx("products-view-order")}
                        >
                            <div
                                className={cx("icon-order")}
                            >
                                {orderSort == 0? Icon.ArrowUp : Icon.ArrowDown}
                                <Link
                                    className={cx("link-order")}
                                    to={configs.routes.products 
                                        + `?categoryId=${
                                            (new URLSearchParams(window.location.search)).get('categoryId') == undefined? 
                                            0 :  (new URLSearchParams(window.location.search)).get('categoryId')}` 
                                        + `&page=${0}`
                                        + `&order=${1-orderSort}`
                                        + `&sortBy=${"default"}`}
                                    onClick={orderSortOnClick}
                                >
                                    
                                </Link>
                            </div>


                        </div>


                    </div>

                    <div    
                        className={cx("products-view-items")}
                    >
                        {
                            productArray.map((product, index) => {
                                return (
                                    <Product 
                                        innerRef={refs.current} 
                                        index={index}
                                        key={index} 
                                        product={product}>
    
                                    </Product>
                                )
                            })
                        }
                        

                    </div>

                </div>

            </div>
        </div>
    )
};


export default ProductsComponent;