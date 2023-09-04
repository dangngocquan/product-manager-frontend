import { func } from 'prop-types';
import Image from '../../../Image';
import styles from './Product.module.scss';
import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
import configs from '../../../../configs';


const cx = classNames.bind(styles);


function Product({innerRef, index,  product}) {
    function handleOnClick() {
        sessionStorage.setItem("productInformations", product.id);
    }

    return (
        <div 
            className={cx("wrapper")}
            ref={(element) => innerRef[index] = element}
        >
            <Link
                className={cx("link")}
                to={configs.routes.productInformations}
                onClick={handleOnClick}
            >
                <div 
                    className={cx("image")}
                >
                    <Image 
                        imgName={product.image}
                    >

                    </Image>
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
                        {`${product.currency}${product.price}`}
                    </div>
                    <div
                        className={cx("sold")}
                    >
                        {`${product.sold === undefined? 0 : product.sold} sold`}
                    </div>
                </div>
            
            </Link>
           
        </div>
    )
}

export default Product;