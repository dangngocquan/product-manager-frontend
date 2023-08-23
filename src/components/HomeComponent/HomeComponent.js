import styles from './HomeComponent.module.scss';
import classNames from "classnames/bind";
import { memo, useEffect, useRef, useState } from 'react';

import Slider from './Slider';
import ProductList from './ProductList';
import api from '../../api';

const cx = classNames.bind(styles);


function HomeComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.categories.getCategoryByLevel(1)
        .then(function (response) {
            setData((prev) => response.categories.categories);
        })
    }, []);

    return (
        <div className={cx("wrapper")}>
            <Slider></Slider>
            <div className={cx("container")}>
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