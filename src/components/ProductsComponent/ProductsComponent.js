import styles from './ProductsComponent.module.scss';
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from 'react';
import {motion, sync} from 'framer-motion';
import api from '../../api';
import services from '../../services';
import Loader from '../Loader';
import NavCategories from './NavCategories';
import configs from '../../configs';
import { Link } from 'react-router-dom';
import Product from './Product/Product';

const cx = classNames.bind(styles);


function ProductsComponent() {
    const [data, setData] = useState([]);
    const [productArray, setProductArray] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

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
                (new URLSearchParams(window.location.search)).get('categoryId')
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
                                                to={configs.routes.products + `?categoryId=${category.id}`}
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