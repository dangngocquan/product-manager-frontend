import classNames from "classnames/bind";
import styles from './Header.module.scss';
import Image from '../Image';
import configs from "../../configs";
import Button from "../Button";
import Icons from "../Icon";

const cx = classNames.bind(styles);

function Header() {

    return (
        <div className={cx("wrapper")}>
            <a
                href={configs.routes.home}
                className={cx("logo")}
            >   
                <Image
                    imgName={"logo.png"}
                >

                </Image>
            </a>

            <a
                className={cx("buttonLogin")}
                href={configs.routes.login}
            >
                {Icons.Login}
                <div
                    className={cx("textLogin")}
                >
                    Sign in / Sign up
                </div>
            </a>
        </div>
    )
}

export default Header;