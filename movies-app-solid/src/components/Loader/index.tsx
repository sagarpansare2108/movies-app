import { Component } from 'solid-js';
import styles from './style.module.scss';

const Loader: Component = () => {
  return (
    <div class={styles.loader}>
      <span class='loading loading-ring loading-lg'></span>
    </div>
  );
};

export default Loader;
