import {
  Suspense,
  lazy,
  memo,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition
} from 'react';
import { useMovie } from '../../hooks/useMovie';
import { classNames } from '../../utils';
import styles from './style.module.scss';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import Loader from '../../components/Loader';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const Reviews = lazy(() => import('../../components/Reviews'));
const Trailers = lazy(() => import('../../components/Trailers'));


export default function MoviePage() {
  const { movie, isLoading } = useMovie();

  useDocumentTitle(movie?.title);

  const [isBannerLoading, setBannerLoading] = useState(true);
  const [isPosterLoading, setPosterLoading] = useState(true);

  return (
    <div className={styles.movie}>
      <div className={styles.movie__header}>
        <div
          className={classNames(
            styles.movie__header__banner,
            styles.placeholder_bg,
            (isLoading || isBannerLoading) && 'shimmer_blured'
          )}
        >
          <img
            loading='lazy'
            src={movie?.backdrop_path}
            alt={movie?.title}
            onLoad={() => {
              startTransition(() => {
                setTimeout(() => {
                  setBannerLoading(false);
                }, 500);
              });
            }}
          />
        </div>
        <div
          className={classNames(
            styles.movie__header__title,
            isLoading && 'text_blur'
          )}
        >
          {(isLoading && 'XXX XXXX XXX') || movie?.title}
        </div>
      </div>
      <div className={styles.movie__content}>
        <div className={styles.movie__content__columns}>
          <div
            className={classNames(
              styles.movie__content__poster,
              styles.placeholder_bg,
              (isLoading || isPosterLoading) && 'shimmer_blured'
            )}
          >
            <img
              loading='lazy'
              src={movie?.medium_poster_path}
              alt={movie?.title}
              onLoad={() => {
                startTransition(() => {
                  setTimeout(() => {
                    setPosterLoading(false);
                  }, 500);
                });
              }}
            />
          </div>
          <div className={styles.movie__content__details}>
            {(!isLoading && (
              <p className={styles.movie__content__details__overview}>
                {movie?.overview}
              </p>
            )) || (
                <div className={styles.movie__content__details__overview_loading}>
                  <p className={'shimmer_effect'}></p>
                  <p className={'shimmer_effect'}></p>
                  <p className={'shimmer_effect'}></p>
                  <p className={'shimmer_effect'}></p>
                </div>
              )}
            <div
              className={classNames(
                styles.movie__content__details__rating,
                isLoading && 'shimmer_blured'
              )}
            >
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
              {(!isLoading && (
                <p className={styles.movie__content__details__row__value}>
                  {movie?.release_date}
                </p>
              )) || (
                  <p
                    className={classNames(
                      styles.movie__content__details__row__date_loading,
                      'shimmer_effect'
                    )}
                  ></p>
                )}
            </div>
            <div className={styles.movie__content__details__row}>
              <p className={styles.movie__content__details__row__label}>
                <span className='material-symbols-outlined'>schedule</span>
                Runtime
              </p>
              {(!isLoading && (
                <p className={styles.movie__content__details__row__value}>
                  {movie?.runtime}
                </p>
              )) || (
                  <p
                    className={classNames(
                      styles.movie__content__details__row__runtime_loading,
                      'shimmer_effect'
                    )}
                  ></p>
                )}
            </div>
            <div className={styles.movie__content__details__row}>
              <p className={styles.movie__content__details__row__label}>
                Genres
              </p>
              {(!isLoading && (
                <p className={styles.movie__content__details__row__value}>
                  {movie?.genres.map((genre) => genre.name).join(', ')}
                </p>
              )) || (
                  <p
                    className={classNames(
                      styles.movie__content__details__row__genres_loading,
                      'shimmer_effect'
                    )}
                  ></p>
                )}
            </div>
          </div>
        </div>
        <MovieMoreTabs />
      </div>
    </div>
  );
}

const MovieMoreTabs: React.FC = memo(() => {
  const {
    selectedTab,
    setSelectedTab,
    reviews,
    trailers,
    isReviewsLoading,
    isTrailersLoading
  } = useMovie();
  const [isPending, startTransition] = useTransition();
  const { isIntersecting, ref } = useIntersectionObserver<HTMLDivElement>({
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  });

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

  useEffect(() => {
    isIntersecting && startTransition(() => {
      setSelectedTab('reviews');
    });
  }, [isIntersecting]);

  const onSelectTab = useCallback(
    (tabId: string) => {
      startTransition(() => {
        setSelectedTab(tabId);
      });
    },
    [setSelectedTab]
  );

  return (
    <div className={styles.movie_more_tabs} ref={ref}>
      <div className={classNames('tabs', styles.movie_more_tabs__nav)}>
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
      <div className={styles.movie_more_tabs__body}>
        {selectedTab === 'reviews' && (
          <Suspense fallback={<Loader />}>
            {(!isReviewsLoading && (
              <Reviews reviews={reviews} isLoading={isReviewsLoading} />
            )) || <Loader />}
          </Suspense>
        )}
        {selectedTab === 'trailers' && (
          <Suspense fallback={<Loader />}>
            {(!isTrailersLoading && (
              <Trailers trailers={trailers} isLoading={isTrailersLoading} />
            )) || <Loader />}
          </Suspense>
        )}
      </div>
    </div>
  );
});
