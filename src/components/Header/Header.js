import classNames from "classnames/bind";
import styles from './Header.module.scss';
import Image from '../Image';
import configs from "../../configs";
import Icons from "../Icon";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion';
import services from "../../services";
import api from "../../api";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function Header() {
    // console.log("render Header");

    const [accountInformations, setAccountInformations] = useState({});
    
    useEffect(() => {
        // console.log("Effect in Header component");
        if (localStorage.getItem("token") != null) {
            api.accounts.getInformations({
                "token": localStorage.getItem("token")       
            })
            .then((res) => res.json())
            .then((res) => {
                setAccountInformations(res.informations);
            })
        }
    }, [])
  
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
                className={cx(
                    "buttonLogin",
                    {"hidden": localStorage.getItem("token") != undefined}
                    )}
                to={configs.routes.login}
            >
                {Icons.Login}
                <div
                    className={cx("textLogin")}
                >
                    Sign in / Sign up
                </div>
            </Link>

            <Link
                className={cx(
                    "user-profile",
                    {"hidden": localStorage.getItem("token") == undefined}
                    )}
            >   
                <Image
                    imgName={localStorage.getItem("token") == null? "" : accountInformations.portrait}
                >

                </Image>
            </Link>


        </motion.div>
    )


    
                
 
}

export default Header;