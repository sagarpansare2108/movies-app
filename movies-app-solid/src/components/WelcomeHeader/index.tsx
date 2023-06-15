import { Component } from "solid-js";
import styles from './style.module.scss';

export const WelcomeHeader: Component = () => {
    return (
        <div class={styles.welcome_header}>
            <h1>Welcome.</h1>
            <h2>Millions of movies to discover. Explore now.</h2>
        </div>
    );
}