import styles from './HomeComponent.module.scss';
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from 'react';
import {motion} from 'framer-motion';
import Slider from './Slider';
import ProductList from './ProductList';
import api from '../../api';
import services from '../../services';
import Loader from '../Loader';

const cx = classNames.bind(styles);


function HomeComponent() {
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await api.categories.getCategoryByLevel(1)
            .then(function (response) {
                setData((prev) => response.categories.categories);
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