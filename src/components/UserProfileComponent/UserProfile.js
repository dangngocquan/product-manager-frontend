import styles from './UserProfile.module.scss';
import classNames from "classnames/bind";

import services from "../../services";
import { useEffect, useRef, useState } from 'react';
import configs from "../../configs";
import Icons from '../Icon';
import Image from '../Image';
import api from '../../api';
import AccountView from './AccountView/AccountView';
import PersionalInformationsView from './PersionalInformationsView/PersionalInformationsView';
import AddressesView from './AddressesView/AddresesView';
import { useNavigate } from 'react-router-dom';
import Icon from '../Icon';
import axios from 'axios';

const cx = classNames.bind(styles);


function UserProfile() {
    const [accountInformations, setAccountInformations] = useState({});
    const [indexOptionSelected, setIndexOptionSelected] = useState(0);
    const [imagePortrait, setImagePortrait] = useState(null);
    const negative = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (sessionStorage.getItem(configs["sessionStorage"]["token"]) !== null) {
                await api.accounts.getInformations({
                    "token": sessionStorage.getItem(configs["sessionStorage"]["token"])       
                })
                .then(
                    (res) => {
                        if (res.status == 200) {
                            return res.json()
                                .then((res) => {
                                    setAccountInformations(res.informations);
                                })
                        } else {
                            sessionStorage.removeItem(configs["sessionStorage"]["token"]);
                            setAccountInformations((prev) => ({
                                "something": "something"
                            }))
                        }
                    }
                )
            }
        }
        
        fetchData();

    }, [])

    const portraitOnChange = (e) => {
        console.log("Doing portrait on change");
        console.log(e.target.files[0]);
        const formData = new FormData(); 
        console.log(formData);
        formData.append('files', e.target.files[0], e.target.files[0].name);
        console.log(formData);
        setImagePortrait(formData);
        axios.post('http://localhost:3000/uploads', formData)
            .then(res => {
                console.log('Axios response: ', res)
            }) 
    }

    return (
        <div
            className={cx("wrapper")}
        >

            <div
                className={cx("back")}
                onClick={() => negative(-1)}
            >
                {Icons.ArrowLeft}
                <p>Back</p>

            </div>

            <div
                className={cx("container")}
            >
                <div
                    className={cx("header")}
                >
                    <div
                        className={cx("default-background-image")}
                    >

                    </div>

                    <div
                        className={cx("portrait-and-name")}
                    >

                        <div
                            className={cx("portrait")}
                        >
                            <Image
                                imgName={accountInformations?.portrait || "default-portrait.jpg"}
                            >

                            </Image>
                            <div
                                className={cx("edit-portrait")}
                            >
                                {Icon.Edit}
                            </div>

                            <input
                                type='file'
                                name='picture'
                                className={cx("button-choose-portrait")}
                                onChange={portraitOnChange}
                            >
                            </input>

                        </div>

                        <div
                            className={cx("nickname")}
                        >
                            {accountInformations?.nickname || "Nickname"}
                        </div>
                    </div>

                </div>

                <div
                    className={cx("body")}
                >

                    <ul
                        className={cx("options")}
                    >

                        <li
                            className={cx(
                                {"selected-option": indexOptionSelected == 0}
                            )}
                            onClick={() => setIndexOptionSelected(0)}
                        >
                            Account
                        </li>
                        <li
                            className={cx(
                                {"selected-option": indexOptionSelected == 1}
                            )}
                            onClick={() => setIndexOptionSelected(1)}
                        >
                            Personal Informations
                        </li>
                        <li
                            className={cx(
                                {"selected-option": indexOptionSelected == 2}
                            )}
                            onClick={() => setIndexOptionSelected(2)}
                        >
                            Addresses
                        </li>

                    </ul>

                    <div
                        className={cx("option-details")}
                    >
                        <div
                            className={cx(
                                "option-detail",
                                {"hidden": indexOptionSelected != 0}
                            )}
                        >
                            <AccountView
                                accountInformations={accountInformations}
                            >

                            </AccountView>
                        </div>

                        <div
                            className={cx(
                                "option-detail",
                                {"hidden": indexOptionSelected != 1}
                            )}
                        >
                            <PersionalInformationsView
                                accountInformations={accountInformations}
                            >

                            </PersionalInformationsView>
                        </div>

                        <div
                            className={cx(
                                "option-detail",
                                {"hidden": indexOptionSelected != 2}
                            )}
                        >
                            <AddressesView></AddressesView>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default UserProfile;