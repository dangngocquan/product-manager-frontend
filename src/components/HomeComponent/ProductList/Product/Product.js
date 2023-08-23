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
                <h1>{product.name}</h1>
            </div>

            <div 
                className={cx("detail")}
            >
                <div
                    className={cx("price")}
                >
                    {`${product.price} ${product.currency}`}
                </div>
                <div
                    className={cx("sold")}
                >
                    {`${product.sold} sold`}
                </div>
            </div>
           
        </div>
    )
}

export default Product;