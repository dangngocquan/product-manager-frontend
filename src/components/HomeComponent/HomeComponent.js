import styles from './HomeComponent.module.scss';
import classNames from "classnames/bind";
import Slider from './Slider';
import ProductList from './ProductList';
import { memo } from 'react';

const cx = classNames.bind(styles);


const HomeComponent = memo(function HomeComponent() {
    return (
        <div className={cx("wrapper")}>
            <Slider></Slider>
            <div className={cx("container")}>
                
                <ProductList></ProductList>
                <ProductList></ProductList>
                <ProductList></ProductList>

            </div>
        </div>
    )
});

export default HomeComponent;