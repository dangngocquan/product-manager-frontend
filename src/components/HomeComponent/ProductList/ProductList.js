import classNames from "classnames/bind";
import { memo, useEffect, useRef, useState } from 'react';
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs'
import styles from './ProductList.module.scss';
import Product from "./Product";
import Button from "../../Button/Button";

const cx = classNames.bind(styles);
const defaulProductWidtth = 250; // From './src/components/GlobalStyles/GlobalStyles.scss'
const defaulProductMarginRight = 30; // From './src/components/GlobalStyles/GlobalStyles.scss'
const widthPerProduct = defaulProductMarginRight + defaulProductWidtth;


const ProductList = memo(function ProductList() {
    const products = [
        {
            "id": "1",
            "shop_id": "1",
            "name": "Product name long long long long long long long long long long long long long long long long long long long long long long long long long long",
            "image": "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
            "price": "100000",
            "currency": "VND",
            "stock": "11000",
            "time_added": "1692570380.252244",
            "description": "description of product",
            "sold": "2100"
        },
        {
            "id": "2",
            "shop_id": "1",
            "name": "Giày thể thao nam G2 Athena Low sneaker trắng bằng da microfiber cao cấp chống nhăn độn đế tăng chiều cao tập thể dục",
            "image": "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
            "price": "10000000000000000000000000000000000000000000000",
            "currency": "VND",
            "stock": "11000",
            "time_added": "1692570380.252244",
            "description": "description of product",
            "sold": "210000000000000000000000000000000000000"
        },
        {
            "id": "3",
            "shop_id": "1",
            "name": "product 01 of shop 1",
            "image": "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
            "price": "100000",
            "currency": "VND",
            "stock": "11000",
            "time_added": "1692570380.252244",
            "description": "description of product",
            "sold": "32"
        },
        {
            "id": "4",
            "shop_id": "1",
            "name": "product 01 of shop 1",
            "image": "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
            "price": "100000",
            "currency": "VND",
            "stock": "11000",
            "time_added": "1692570380.252244",
            "description": "description of product",
            "sold": "32"
        },
        {
            "id": "5",
            "shop_id": "1",
            "name": "product 01 of shop 1",
            "image": "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
            "price": "100000",
            "currency": "VND",
            "stock": "11000",
            "time_added": "1692570380.252244",
            "description": "description of product",
            "sold": "32"
        }
    ]
    const refs = useRef(products.map((product) => null));
    const refButtons = useRef([null, null]);
    const refProductContainer = useRef();
    const refContainer = useRef();

    const [indexStart, setIndexStart] = useState(0);

    useEffect(() => {
        refButtons.current[0].style.visibility = (indexStart == 0)? "hidden" : "visible";
        refButtons.current[1].style.visibility = 
            (refProductContainer.current.offsetWidth - indexStart * widthPerProduct <= refContainer.current.offsetWidth 
                || indexStart == products.length-1)? "hidden" : "visible";
    }, [indexStart]);
    
    useEffect(() => {
        handleButtonLeft();
        handleButtonRight();    
    }, []);

    const handleButtonLeft = function() {
        setIndexStart((prev) => (prev - 1) % products.length);
        refProductContainer.current.style.left = `${refProductContainer.current.offsetLeft + widthPerProduct}px`;
    }

    const handleButtonRight = function() {
        setIndexStart((prev) => (prev + 1) % products.length);
        refProductContainer.current.style.left = `${refProductContainer.current.offsetLeft - widthPerProduct}px`;
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
                    <h1>Category name</h1>
                </div>
                
                
                <div 
                    ref={refProductContainer} 
                    className={cx("products")}
                >
                    {
                        products.map((product, index) => {
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
});

export default ProductList;