import { A } from '@solidjs/router';
import { classNames } from '../../utils';
import styles from './style.module.scss';

export default function NotFound() {
  return (
    <div class={styles.wrap}>
      <div class={styles.container}>
        <p
          class={classNames(
            styles.container__text_base,
            styles.container__text_base__red
          )}
        >
          404
        </p>
        <h1 class={styles.container__heading}>Page not found</h1>
        <p
          class={classNames(
            styles.container__text_base,
            styles.container__text_base__sub_text
          )}
        >
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div class={styles.container__back_home}>
          <A href='/'>
            <span class='material-symbols-outlined'>arrow_back</span> Go back
            home
          </A>
        </div>
      </div>
    </div>
  );
}
