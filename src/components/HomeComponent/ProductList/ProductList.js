import classNames from "classnames/bind";
import { memo, useEffect, useRef, useState } from 'react';
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs'
import styles from './ProductList.module.scss';
import Product from "./Product";
import Button from "../../Button/Button";

const cx = classNames.bind(styles);


const ProductList = memo(function ProductList() {
    var ids = [1, 2, 3, 4, 5, 6, 7];
    const refs = useRef(ids.map((id) => null));
    const refButtons = useRef([null, null]);
    const refProductContainer = useRef();
    const refContainer = useRef();

    const [indexStart, setIndexStart] = useState(0);

    useEffect(() => {
        refButtons.current[0].style.visibility = (indexStart == 0)? "hidden" : "visible";
        refButtons.current[1].style.visibility = 
            (refProductContainer.current.offsetWidth - indexStart * 350 <= refContainer.current.offsetWidth 
                || indexStart == ids.length-1)? "hidden" : "visible";
    }, [indexStart]);
    
    useEffect(() => {
        handleButtonLeft();
        handleButtonRight();    
    }, []);

    const handleButtonLeft = function() {
        setIndexStart((prev) => (prev - 1) % ids.length);
        refProductContainer.current.style.left = `${refProductContainer.current.offsetLeft + 350}px`;
    }

    const handleButtonRight = function() {
        setIndexStart((prev) => (prev + 1) % ids.length);
        refProductContainer.current.style.left = `${refProductContainer.current.offsetLeft - 350}px`;
    }

    return (
        <div className={cx("wrapper")}>
            <div 
                className={cx("left")} 
                onClick={handleButtonLeft}
                ref={(element) => refButtons.current[0] = element}
            >
                <Button>
                    <BsChevronLeft/>
                </Button>
            </div>
                
            <div 
                ref={refContainer}
                className={cx("container")}
            >
                <h1>Category name</h1>
                
                <div 
                    ref={refProductContainer} 
                    className={cx("products")}
                >
                    {
                        ids.map((id, index) => {
                            return (
                                <Product 
                                    innerRef={refs.current} 
                                    index={index}
                                    key={index} 
                                    id={id}>

                                </Product>
                            )
                        })
                    }
                </div>
            </div>
            <div 
                className={cx("right")} 
                onClick={handleButtonRight}
                ref={(element) => refButtons.current[1] = element}
            >
                <Button>
                    <BsChevronRight/>
                </Button>
            </div>
        </div>
    )
});

export default ProductList;