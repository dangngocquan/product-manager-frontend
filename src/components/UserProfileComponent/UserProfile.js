import styles from './UserProfile.module.scss';
import classNames from "classnames/bind";

import services from "../../services";
import { useRef, useState } from 'react';
import Icons from '../Icon';
import Image from '../Image';

const cx = classNames.bind(styles);


function UserProfile() {

    return (
        <div
            className={cx("wrapper")}
        >

            <div
                className={cx("back")}
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
                                imgName={"default-portrait.jpg"}
                            >

                            </Image>
                        </div>

                        <div
                            className={cx("nickname")}
                        >
                            {"Đặng Ngọc Quân"}
                        </div>
                    </div>

                </div>

                <div
                    className={cx("body")}
                >

                    <ul
                        className={cx("options")}
                    >

                    <li>Account</li>
                    <li>Personal Informations</li>
                    <li>Addresses</li>

                    </ul>

                    <div
                        className={cx("option-details")}
                    >

                    </div>

                </div>

            </div>

        </div>
    )
}

export default UserProfile;