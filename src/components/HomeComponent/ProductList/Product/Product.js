import styles from './Product.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


function Product({innerRef, index,  id}) {
    return (
        <div 
            className={cx("wrapper")}
            ref={(element) => innerRef[index] = element}>
            <h1>ID: {id}</h1>
        </div>
    )
}

export default Product;