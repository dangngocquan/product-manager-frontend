import styles from './AddressesView.module.scss';
import classNames from "classnames/bind";


const cx = classNames.bind(styles);


function AddressesView() {
    
    return (
        <div
            className={cx("wrapper")}
        >

            Addresses
        </div>
    )
}

export default AddressesView;