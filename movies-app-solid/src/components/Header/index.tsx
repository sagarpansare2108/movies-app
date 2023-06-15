import { Component, For, createMemo } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import styles from './style.module.scss';
import { Page } from "../../models";
import { classNames } from "../../utils";
import logo from '../../assets/logo.svg';

interface IHeader {
    pages: Page[];
}

export const Header: Component<IHeader> = ({ pages }) => {
    const location = useLocation();
    const pathname = createMemo(() => location.pathname);

    return (
        <header class={styles.header}>
            <div class={classNames('container', styles.header__container)}>
                <nav class={styles.header__nav}>
                    <A href={'/'} class={styles.header__logo}>
                        <img src={logo} />
                    </A>
                    <ul class={styles.header__menus}>
                        <For each={pages}>
                            {(page) => (
                                <li class={classNames(
                                    styles.header__menus__menu,
                                    pathname() === page.path && styles.header__menus__active_menu
                                )}>
                                    <A href={page.path}>
                                        {page.title}
                                    </A>
                                </li>
                            )}
                        </For>
                    </ul>
                </nav>
            </div>
        </header>
    );
}