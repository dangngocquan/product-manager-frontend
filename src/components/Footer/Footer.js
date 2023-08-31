import classNames from "classnames/bind";
import styles from './Footer.module.scss';
import Icons from "../Icon";

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div
            className={cx("wrapper")}
        >
            <h1
                className={cx("title")}
            >
                PM Shop
            </h1>

            <p
                className={cx("description")}
            >
                This is only a personal project I created when learning Javascript.
            </p>

            <ul
                className={cx("socials")}
            >
                <li
                    className={cx("social-item")}
                >
                    <a
                        href="https://twitter.com/dangngocquan104"
                    >
                        {Icons.Twitter}
                    </a>
                    
                </li>

                <li
                    className={cx("social-item")}
                >
                    <a
                        href="https://github.com/dangngocquan"
                    >
                        {Icons.Github}
                    </a>
                    
                    
                </li>

            
            </ul>

        </div>
    )
}

export default Footer;