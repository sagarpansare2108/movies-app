import { component$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import styles from './style.module.scss';
import logo from '~/assets/logo.svg';
import { classNames } from '~/utils';
import { PAGES } from '~/constants';

const Header = component$(() => {
  const location = useLocation();
  const pathname = (location && location.url.pathname || '');
  const currentpath = pathname !== '/' && pathname.replace(
    /\/$/,
    ''
  ) || pathname;
  
  return (
    <>
      <header class={styles.header}>
        <div class={classNames('container', styles.header__container)}>
          <nav class={styles.header__nav}>
            <Link href={'/'} class={styles.header__logo} aria-label='Home'>
              <img src={logo} width={'154'} height={'25'} alt='TMDB' />
            </Link>
            <ul class={styles.header__menus}>
              {PAGES.map((page, i) => (
                <li
                  key={i}
                  class={classNames(
                    styles.header__menus__menu,
                    currentpath === `${page.path}` &&
                      styles.header__menus__active_menu
                  )}
                >
                  <Link href={page.path} aria-label={page.title}>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
});

export default Header;