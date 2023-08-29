import classNames from "classnames/bind";

import Header from '../../components/Header';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({token, setToken, children}) {
    
    return (
        <div className={cx('wrapper')}>
            <Header
                token={token}
                setToken={setToken}
            />
            <div className={cx('container')}>
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;