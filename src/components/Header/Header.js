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
    console.log("render Header");

    const [accountInformations, setAccountInformations] = useState({});
    const [isHiddenUserProfileOptions, setIsHiddenUserProfileOptions] = useState(true);
    
    useEffect(() => {
        // console.log("Effect in Header component");
        if (localStorage.getItem("token") !== null) {
            api.accounts.getInformations({
                "token": localStorage.getItem("token")       
            })
            .then(
                (res) => {
                    if (res.status == 200) {
                        return res.json()
                            .then((res) => {
                                setAccountInformations(res.informations);
                            })
                    } else {
                        localStorage.removeItem("token");
                        setAccountInformations((prev) => ({
                            "something": "something"
                        }))
                    }
                }
            )
        }
    }, [])


    function handleUserProfileOnClick() {
        setIsHiddenUserProfileOptions((prev) => !prev);
    }

    function handleSignOutOnClick() {
        localStorage.removeItem("token");
    }
  
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




            <div
                className={cx("nav")}
            >

            </div>




            <Link
                className={cx(
                    "buttonLogin",
                    {"hidden": localStorage.getItem("token") !== null}
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

            

            <div
                className={cx(
                    "user-profile",
                    {"hidden": localStorage.getItem("token") === null}
                )}
                onClick={handleUserProfileOnClick}
            >   
                <Image
                    imgName={accountInformations?.portrait || "default-portrait.jpg"}
                >

                </Image>

                <p>You</p>

                <ul
                    className={cx(
                        "user-profile-options",
                        {"hidden": isHiddenUserProfileOptions}
                    )}
                >

                    <li>Your profile</li>
                    <li
                        onClick={handleSignOutOnClick}
                    >
                        <Link
                            to={configs.routes.home}
                        >
                            Sign out
                        </Link>
                        
                        
                    </li>

                </ul>
            </div>




        </motion.div>
    )


    
                
 
}

export default Header;