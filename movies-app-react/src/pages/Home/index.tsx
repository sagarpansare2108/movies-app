import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './style.module.scss';
import { Header } from '../../components/Header';

export default function Home() {
  return (
    <Fragment>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </Fragment>
  );
}
