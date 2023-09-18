import styles from './PersionalInformationsView.module.scss';
import classNames from "classnames/bind";


const cx = classNames.bind(styles);


function PersionalInformationsView({accountInformations}) {
    
    return (
        <div
            className={cx("wrapper")}
        >

            <p>{`Nickname: ${accountInformations["nickname"]}`}</p>
            <p>{`Email: ${accountInformations["email"]}`}</p>
            <p>{`Phone number: ${accountInformations["phone_number"]}`}</p>
            <p>{`Birthday: ${accountInformations["birthday"]}`}</p>

        </div>
    )
}

export default PersionalInformationsView;