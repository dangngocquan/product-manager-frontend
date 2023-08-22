import styles from './Product.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


function Product({id}) {
    return (
        <div className={cx("wrapper")}>
            <h1>ID: {id}</h1>
        </div>
    )
}

export default Product;