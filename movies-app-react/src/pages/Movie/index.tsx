import { useMovie } from '../../hooks/useMovie';
import { classNames } from '../../utils';
import styles from './style.module.scss';
import { Movie } from '../../models';
import { Suspense, lazy, useCallback, useMemo, useState, useTransition } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Reviews = lazy(() => import('../../components/Reviews'));
const Trailers = lazy(() => import('../../components/Trailers'));

export default function MoviePage() {
  const { movie, isLoading, selectedTab, setSelectedTab } = useMovie();

  useDocumentTitle(movie?.title);

  return (
    <div className={styles.movie}>
      <div className={styles.movie__header}>
        <div
          className={classNames(
            styles.movie__header__banner,
            styles.placeholder_bg
          )}
        >
          <img loading='lazy' src={movie?.backdrop_path} alt={movie?.title} />
        </div>
        <div className={styles.movie__header__title}>{movie?.title}</div>
      </div>
      <div className={styles.movie__content}>
        <div className={styles.movie__content__columns}>
          <div
            className={classNames(
              styles.movie__content__poster,
              styles.placeholder_bg
            )}
          >
            <img
              loading='lazy'
              src={movie?.medium_poster_path}
              alt={movie?.title}
            />
          </div>
          <div className={styles.movie__content__details}>
            <p className={styles.movie__content__details__overview}>
              {movie?.overview}
            </p>
            <div className={styles.movie__content__details__rating}>
              <span className='material-symbols-outlined'>star</span>
              {movie?.vote_average.toFixed(1)}
            </div>
            <div className={styles.movie__content__details__row}>
              <p className={styles.movie__content__details__row__label}>
                <span className='material-symbols-outlined'>
                  calendar_month
                </span>
                Release date
              </p>
              <p className={styles.movie__content__details__row__value}>
                {movie?.release_date}
              </p>
            </div>
            <div className={styles.movie__content__details__row}>
              <p className={styles.movie__content__details__row__label}>
                <span className='material-symbols-outlined'>schedule</span>
                Runtime
              </p>
              <p className={styles.movie__content__details__row__value}>
                {movie?.runtime}
              </p>
            </div>
            <div className={styles.movie__content__details__row}>
              <p className={styles.movie__content__details__row__label}>
                Genres
              </p>
              <p className={styles.movie__content__details__row__value}>
                {movie?.genres.map((genre) => genre.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
        <MovieMoreTabs />
      </div>
    </div>
  );
}

const MovieMoreTabs: React.FC = () => {
  const { selectedTab, setSelectedTab, reviews, trailers } = useMovie();
  const [isPending, startTransition] = useTransition();

  const tabs: Array<{ id: string; title: string }> = useMemo(
    () => [
      {
        id: 'reviews',
        title: 'Reviews'
      },
      {
        id: 'trailers',
        title: 'Trailers'
      }
    ],
    []
  );

  const onSelectTab = useCallback(
    (tabId: string) => {
      startTransition(() => {
        setSelectedTab(tabId);
      });
    },
    [setSelectedTab]
  );

  return (
    <div className={styles.movie__content__more_info}>
      <div className={classNames('tabs', styles.movie__content__tabs)}>
        {tabs.map((tab) => (
          <a
            key={tab.id}
            className={classNames(
              'tab tab-bordered',
              isPending && 'tab-disabled',
              tab.id === selectedTab && 'tab-active'
            )}
            onClick={(e) => {
              e.preventDefault();
              onSelectTab(tab.id);
            }}
          >
            {tab.title}
          </a>
        ))}
      </div>
      <div className={styles.movie__content__tab_body}>
        {selectedTab === 'reviews' && (
          <Suspense fallback={<h1>Loading....</h1>}>
            <Reviews reviews={reviews} />
          </Suspense>
        )}
        {selectedTab === 'trailers' && (
          <Suspense fallback={<h1>Loading....</h1>}>
            <Trailers trailers={trailers} />
          </Suspense>
        )}
      </div>
    </div>
  );
};
