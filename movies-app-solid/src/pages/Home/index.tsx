import { Outlet } from '@solidjs/router';
import styles from './style.module.scss';
import { PAGES } from '../../constants';
import { Header } from '../../components/Header';

export default function HomePage() {
  return (
    <>
      <Header pages={PAGES} />
      <main class={styles.main}>
        <Outlet />
      </main>
    </>
  );
}
