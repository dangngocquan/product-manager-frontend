import styles from './HomeComponent.module.scss';
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from 'react';
import {motion} from 'framer-motion';
import Slider from './Slider';
import ProductList from './ProductList';
import api from '../../api';
import services from '../../services';

const cx = classNames.bind(styles);


function HomeComponent({token, setToken}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.categories.getCategoryByLevel(1)
        .then(function (response) {
            setData((prev) => response.categories.categories);
        })
    }, []);

    return (
        <div className={cx("wrapper")}>
            
            <div
                className={cx("slider")}
            >
                <Slider></Slider>
            </div>

            <div 
                className={cx("container")}
            >

                {
                    data.map((category, index) => {
                        return (
                            <ProductList 
                                key={index}
                                category={category}
                            >

                            </ProductList>
                        )
                    })
                }

            </div>
        </div>
    )
};


export default HomeComponent;