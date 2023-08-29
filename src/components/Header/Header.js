import classNames from "classnames/bind";
import styles from './Header.module.scss';
import Image from '../Image';
import configs from "../../configs";
import Icons from "../Icon";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion';
import services from "../../services";

const cx = classNames.bind(styles);

function Header({token, setToken}) {
    if (token == null) {
        return (
            <motion.div 
                className={cx("wrapper")}
                variants={services.routeAnimations.header}
                initial="initial"
                animate="final"
            >


                <Link
                    to={configs.routes.home}
                    className={cx("logo")}
                >   
                    <Image
                        imgName={"logo.png"}
                    >
    
                    </Image>
                </Link>
    
                <Link
                    className={cx("buttonLogin")}
                    to={configs.routes.login}
                >
                    {Icons.Login}
                    <div
                        className={cx("textLogin")}
                    >
                        Sign in / Sign up
                    </div>
                </Link>
            </motion.div>
        )



    } else {

        

        return (
            <div className={cx("wrapper")}>
                <Link
                    to={configs.routes.home}
                    className={cx("logo")}
                >   
                    <Image
                        imgName={"logo.png"}
                    >
    
                    </Image>
                </Link>
    
                
            </div>
        )
    }
}

export default Header;