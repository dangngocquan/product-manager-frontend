import classNames from "classnames/bind";

import styles from './LayoutBlank.module.scss';

const cx = classNames.bind(styles);

function LayoutBlank({children}) {
    return (
        <div className={cx('wrapper')}>
           {children}
        </div>
    );
}

export default LayoutBlank;