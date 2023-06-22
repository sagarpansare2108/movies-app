import { Component, For, Index, Show, Suspense, createEffect, createMemo, createSignal, lazy, onCleanup, startTransition, useTransition } from 'solid-js';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useMovie } from '../../hooks/useMovie';
import styles from './style.module.scss';
import Loader from '../../components/Loader';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const Reviews = lazy(() => import('../../components/Reviews'));
const Trailers = lazy(() => import('../../components/Trailers'));

export default function MoviePage() {
  const { movie, isLoading } = useMovie();
  const [isBannerLoading, setBannerLoading] = createSignal<boolean>(true);
  const [isPosterLoading, setPosterLoading] = createSignal<boolean>(true);

  createEffect(() => {
    if (isLoading()) {
      useDocumentTitle('Loading...');
    } else {
      useDocumentTitle(movie && movie()?.title);
    }
  });

  const movieOtherDetails = createMemo(() => [
    {
      id: 1,
      icon: 'calendar_month',
      title: 'Release date',
      value: movie()?.release_date
    },
    {
      id: 2,
      icon: 'schedule',
      title: 'Runtime',
      value: movie()?.runtime
    },
    {
      id: 3,
      icon: '',
      title: 'Genres',
      value: movie()?.genres.map((genre) => genre.name).join(', ')
    }
  ]);

  return (
    <div class={styles.movie}>
      <div class={styles.movie__header}>
        <div
          classList={{
            [styles.movie__header__banner]: true,
            [styles.placeholder_bg]: true,
            [styles['movie__header__banner--loading']]: isLoading() || isBannerLoading()
          }}
        >
          <img
            loading='lazy'
            src={movie()?.backdrop_path}
            alt={movie()?.title}
            onLoad={() => {
              startTransition(() => {
                setBannerLoading(false);
              });
            }}
          />
        </div>
        <div
          classList={{
            [styles.movie__header__title]: true,
            [styles['movie__header__title--loading']]: isLoading()
          }}
        >
          {(isLoading() && 'XXX XXXX XXX') || movie()?.title}
        </div>
      </div>
      <div class={styles.movie__content}>
        <div class={styles.movie__content__columns}>
          <div
            classList={{
              [styles.movie__content__poster]: true,
              [styles.placeholder_bg]: true,
              [styles['movie__content__poster--loading']]: isLoading() || isPosterLoading(),
            }}
          >
            <img
              loading='lazy'
              src={movie()?.medium_poster_path}
              alt={movie()?.title}
              onLoad={() => {
                startTransition(() => {
                  setPosterLoading(false);
                });
              }}
            />
          </div>
          <div class={styles.movie__content__details}>
            <Show when={!isLoading()} fallback={
              <div class={styles.movie__content__details__overview_loading}>
                <p class={'shimmer_effect'}></p>
                <p class={'shimmer_effect'}></p>
                <p class={'shimmer_effect'}></p>
                <p class={'shimmer_effect'}></p>
              </div>
            }>
              <p class={styles.movie__content__details__overview}>
                {movie()?.overview}
              </p>
            </Show>
            <div
              classList={{
                [styles.movie__content__details__rating]: true,
                [styles['movie__content__details__rating--loading']]: isLoading(),
              }}
            >
              <span class='material-symbols-outlined'>star</span>
              {movie()?.vote_average.toFixed(1)}
            </div>
            <Index each={movieOtherDetails()}>
              {(detail) => (
                <div class={styles.movie__content__details__row}>
                  <p class={styles.movie__content__details__row__label}>
                    {detail().icon && <span class='material-symbols-outlined'>
                      {detail().icon}
                    </span>}
                    {detail().title}
                  </p>
                  <Show when={!isLoading()} fallback={
                    <p
                      classList={{
                        [styles['movie__content__details__row__value--loading']]: true,
                        [styles['movie__content__details__row__value--release-date']]: detail().id === 1,
                        [styles['movie__content__details__row__value--runtime']]: detail().id === 2,
                        [styles['movie__content__details__row__value--genres']]: detail().id === 3,
                        'shimmer_effect': true
                      }}
                    ></p>
                  }>
                    <p class={styles.movie__content__details__row__value}>
                      {detail().value}
                    </p>
                  </Show>
                </div>
              )}
            </Index>
          </div>
        </div>
        <MovieMoreTabs />
      </div>
    </div>
  );
}


const MovieMoreTabs: Component = () => {
  const {
    selectedTab,
    setSelectedTab,
    reviews,
    trailers,
    isReviewsLoading,
    isTrailersLoading
  } = useMovie();
  const [isPending, startTransition] = useTransition();
  const { ref, setRef, isIntersecting } = useIntersectionObserver<HTMLDivElement>();

  const tabs: Array<{ id: string; title: string }> = [
    {
      id: 'reviews',
      title: 'Reviews'
    },
    {
      id: 'trailers',
      title: 'Trailers'
    }
  ];

  const onSelectTab = (tabId: string) => {
    startTransition(() => {
      setSelectedTab(tabId);
    });
  };

  createEffect(() => {
    isIntersecting() && (
      startTransition(() => {
        setSelectedTab('reviews');
      })
    );
  });

  return (
    <div class={styles.movie_more_tabs} ref={(el) => setRef(el)}>
      <div classList={{
        'tabs': true,
        [styles.movie_more_tabs__nav]: true
      }}>
        <Index each={tabs}>
          {(tab) => (
            <a
              classList={{
                'tab tab-bordered': true,
                'tab-disabled': isPending(),
                'tab-active': tab().id === selectedTab()
              }}
              onClick={(e) => {
                e.preventDefault();
                onSelectTab(tab().id);
              }}
            >
              {tab().title}
            </a>
          )}
        </Index>
      </div>
      <div class={styles.movie_more_tabs__body}>
        {selectedTab() === 'reviews' && (
          <Suspense fallback={<Loader />}>
            <Reviews reviews={reviews} isLoading={isReviewsLoading} />
          </Suspense>
        )}
        {selectedTab() === 'trailers' && (
          <Suspense fallback={<Loader />}>
            <Trailers trailers={trailers} isLoading={isTrailersLoading} />
          </Suspense>
        )}
      </div>
    </div>
  );
};