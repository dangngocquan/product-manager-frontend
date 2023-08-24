import classNames from "classnames/bind";
import { useEffect, useRef, useState } from 'react';
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs'
import styles from './ProductList.module.scss';
import Product from "./Product";
import Button from "../../Button/Button";
import api from '../../../api';

const cx = classNames.bind(styles);
const defaulProductWidtth = 250; // From './src/components/GlobalStyles/GlobalStyles.scss'
const defaulProductMarginRight = 30; // From './src/components/GlobalStyles/GlobalStyles.scss'
const widthPerProduct = defaulProductMarginRight + defaulProductWidtth;

function ProductList({category}) {
    // console.log("Re-render Product List");
    const [data, setData] = useState([]);

    const refs = useRef(data.map((product) => null));
    const refButtons = useRef([null, null]);
    const refProductContainer = useRef();
    const refContainer = useRef();

    const [indexStart, setIndexStart] = useState(0);
    useEffect(() => {
        // console.log("useEffect call API");
        api.products.getLastestProductsByCategoryId(category.id)
        .then(function (response) {
            setData((prev) => {
                return response.products.products;
            });
        }); 
    }, []);

    useEffect(() => {
        // console.log("useEffect Set visibility of buttons");
        refButtons.current[0].style.visibility = (indexStart == 0)? "hidden" : "visible";
        // console.log(refProductContainer.current.offsetWidth + " " +  indexStart * widthPerProduct + " " + refContainer.current.offsetWidth)
        refButtons.current[1].style.visibility = 
            (
                (indexStart == data.length-1 && data.length > 0) || 
                (data.length > 0 && (data.length - indexStart) * widthPerProduct <= refContainer.current.offsetWidth) ||
                (data.length == 0)
            )? "hidden" : "visible";
    }, [indexStart, data]);


    const handleButtonLeft = function() {
        if (data.length > 0) {
            // console.log("Left button work");
            setIndexStart((prev) => (prev - 1));
            refProductContainer.current.style.translate = `-${(indexStart-1) * widthPerProduct}px`;
        } else {
            // console.log("Left button not work");
        }
    }

    const handleButtonRight = function() {
        if (data.length > 0) {
            // console.log("Right button work");
            setIndexStart((prev) => (prev + 1));
            refProductContainer.current.style.translate = `${-(indexStart+1) * widthPerProduct}px`;
        } else {
            // console.log("Right button not work");
        }
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
                <div
                    className={cx("categoryName")}
                >
                    <h1>{category.name}</h1>
                </div>
                
                
                <div 
                    ref={refProductContainer} 
                    className={cx("products")}
                >
                    {
                        data.map((product, index) => {
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
};

export default ProductList;