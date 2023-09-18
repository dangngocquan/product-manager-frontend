import styles from './AccountView.module.scss';
import classNames from "classnames/bind";


const cx = classNames.bind(styles);


function AccountView({accountInformations}) {
    
    return (
        <div
            className={cx("wrapper")}
        >

            <p>{`Username: ${accountInformations["username"]}`}</p>
            <p>{`Password: ${accountInformations["password"]}`}</p>
            <p>{`Created time: ${(new Date(accountInformations["time_registered"] * 1000))}`}</p>

        </div>
    )
}

export default AccountView;