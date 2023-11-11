import classNames from "classnames/bind";
import { useEffect, useRef, useState } from 'react';
import styles from './NavCategories.module.scss';
import configs from "../../../configs";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function NavCategories({categories}) {
    return (
        <div className={cx("wrapper")}>
            {
                categories.map((category, index) => {
                    return (
                        <div
                            className={cx("category")}
                            key={index}
                        >
                            <div
                                className={cx("category-name")}
                            >
                                {category.name}
                                <Link
                                    className={cx("link")}
                                    to={configs.routes.products + `?categoryId=${category.id}`}
                                >
                                    
                                </Link>
                            </div>

                            <div
                                className={cx(
                                    "children",
                                    {"hidden" : true}
                                )
                            }
                            >
                                <NavCategories
                                    categories={category.children}
                                >
                                </NavCategories>
                            </div>
                            
                        </div>
                        
                    )
                })
            }
           
        </div>
    )
};

export default NavCategories;