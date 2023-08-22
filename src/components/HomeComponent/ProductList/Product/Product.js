import styles from './Product.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


function Product({innerRef, index,  product}) {
    return (
        <div 
            className={cx("wrapper")}
            ref={(element) => innerRef[index] = element}
        >
            <div 
                className={cx("image")}
                style={{
                    backgroundImage: `url(${product.image})`
                }}
            >
            </div>

            <div 
                className={cx("name")}
            >
                {product.name}
            </div>
           
        </div>
    )
}

export default Product;