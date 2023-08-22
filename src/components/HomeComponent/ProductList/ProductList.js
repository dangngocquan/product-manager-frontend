import classNames from "classnames/bind";
import { memo, useEffect, useRef, useState } from 'react';
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs'
import styles from './ProductList.module.scss';
import Product from "./Product";
import Button from "../../Button/Button";

const cx = classNames.bind(styles);


const ProductList = memo(function ProductList() {
    var ids = [1, 2, 3, 4, 5];
    const refs = useRef([]);
    const refButtons = useRef([null, null]);
    const refProductContainer = useRef();

    const [indexStart, setIndexStart] = useState(0);

    useEffect(() => {
        console.log(refProductContainer);
    }, [indexStart]); 

    const handleButtonLeft = function() {
        setIndexStart((prev) => (prev - 1) % ids.length);
    }

    const handleButtonRight = function() {
        setIndexStart((prev) => (prev + 1) % ids.length);
    }

    return (
        <div className={cx("wrapper")}>
            <div ref={refButtons[0]} className={cx("left")} onClick={handleButtonLeft}>
                <Button>
                    <BsChevronLeft/>
                </Button>
            </div>
                
            <div className={cx("container")}>
                <h1>Category name</h1>
                
                <div ref={refProductContainer} className={cx("products")}>
                    {
                        ids.map((id, index) => {
                            refs.current.push(null);
                            return (
                                <Product ref={refs.current[index]} key={index} id={id}></Product>
                            )
                        })
                    }
                </div>
            </div>
            <div ref={refButtons[1]} className={cx("right")} onClick={handleButtonRight}>
                <Button>
                    <BsChevronRight/>
                </Button>
            </div>
        </div>
    )
});

export default ProductList;