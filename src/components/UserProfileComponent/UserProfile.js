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

    function portraitOnChange(e) {
        const formData = new FormData(); 
        formData.append('files', e.target.files[0], e.target.files[0].name);
        setImagePortrait(formData);
        axios.post(configs.api.root + '/uploads', formData)
            .then(res => {
                if (res.status == 200) {
                    var newAccountInformations = {
                        ...accountInformations
                    }
                    newAccountInformations.portrait = res.data.url;
                    setAccountInformations((prev) => newAccountInformations);
                    api.accounts.updatePortraitAccount(sessionStorage.getItem('token'), res.data.url)
                        .then(res => {
                            api.accounts.login({
                                'username' : accountInformations.username,
                                'password' : accountInformations.password
                            })
                            .then(res0 => {
                                res0.json()
                                    .then(res0 => {
                                    sessionStorage.setItem(configs["sessionStorage"]["token"], res0.token);
                                })
                                
                            })
                        })
                }
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
                                imgName={accountInformations.portrait}
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