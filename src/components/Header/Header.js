import classNames from "classnames/bind";
import styles from './Header.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx("wrapper")}>
            <div
                className={cx("logo")}
            >   
                <Image
                    imgName={"logo.png"}
                >

                </Image>
            </div>
        </div>
    )
}

export default Header;