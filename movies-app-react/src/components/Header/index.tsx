import styles from './style.module.scss';
import logo from '../../assets/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { PAGES } from '../../constants/routes';
import { classNames } from '../../utils';


interface IHeader {}

export const Header: React.FC<IHeader> = ({ }) => {
    const location = useLocation();
    const pathName = location.pathname;

    return (
      <header className={styles.header}>
        <div className={classNames('container', styles.header__container)}>
            <nav className={styles.header__nav}>
                <Link to={'/'} className={styles.header__logo}>
                    <img src={logo} />
                </Link>
                <ul className={styles.header__menus}>
                    {PAGES.map((page, i) => (
                        <li key={i} className={classNames(styles.header__menus__menu, pathName === page.path && styles.header__menus__active_menu)}>
                            <Link to={page.path}>
                                {page.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav> 
            {/* <button type="button" className={styles.header__search}>
                <span className="material-symbols-outlined">
                    search
                </span>
            </button> */}
        </div>       
      </header> 
    )
}