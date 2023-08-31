import classNames from "classnames/bind";

import Header from '../../components/Header';
import styles from './DefaultLayout.module.scss';
import Footer from "../../components/Footer";

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

            <Footer></Footer>

        </div>
    );
}

export default DefaultLayout;