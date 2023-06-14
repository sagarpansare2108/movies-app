import { Link } from 'react-router-dom';
import { classNames } from '../../utils';
import styles from './style.module.scss';

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <p
          className={classNames(
            styles.container__text_base,
            styles.container__text_base__red
          )}
        >
          404
        </p>
        <h1 className={styles.container__heading}>Page not found</h1>
        <p
          className={classNames(
            styles.container__text_base,
            styles.container__text_base__sub_text
          )}
        >
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className={styles.container__back_home}>
          <Link to='/'>
            <span className='material-symbols-outlined'>arrow_back</span> Go back
            home
          </Link>
        </div>
      </div>
    </div>
  );
}
