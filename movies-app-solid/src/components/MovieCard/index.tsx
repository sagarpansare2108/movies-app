import { Accessor, Component, createEffect, createMemo, createSignal, on, onCleanup } from 'solid-js';
import { A } from '@solidjs/router';
import styles from './style.module.scss';
import { Movie } from '../../models';
import LazyImage from '../LazyImage';
import placeholderImage from '../../assets/placeholder.jpeg';

const MovieCard: Component<{
  movie: Accessor<Movie>;
  isLoading?: Accessor<boolean>;
  isRouting?: Accessor<boolean>;
  isLoadMoreLoading?: Accessor<boolean>;
}> = ({
  movie,
  isLoading = () => false,
  isRouting = () => false,
  isLoadMoreLoading = () => false,
}) => {
    const moviePosterImage = createMemo(() => movie().small_poster_path);
    const movieTitle = createMemo(() => movie().title);

    const isMovieLoading = () => {
      return !isLoadMoreLoading() && (isLoading() || isRouting());
    };

    return (
      <div class={styles.movie_card}>
        <div
          classList={{
            [styles.movie_card__rating]: true,
            [styles['movie_card__rating--loading']]: isMovieLoading(),
          }}
        >
          <span class='material-symbols-outlined'>star</span>
          {movie().vote_average.toFixed(1)}
        </div>
        <A
          classList={{
            [styles.movie_card__image]: true,
            [styles['movie_card__image--loading']]: isMovieLoading(),
          }}
          href={`/movie/${movie().id}`}
          style={isMovieLoading() ? { 'pointer-events': 'none' } : undefined}
        >
          <LazyImage
            src={moviePosterImage}
            placeholder={placeholderImage}
            alt={movieTitle}
          />
        </A>
        <div classList={{
          [styles.movie_card__title]: true,
          [styles['movie_card__title--loading']]: isMovieLoading(),
        }}>
          <A
            href={`/movie/${movie().id}`}
            style={isLoading() || isRouting() ? { 'pointer-events': 'none' } : undefined}
          >
            {movie().title}
          </A>
        </div>
      </div>
    );
  };

export default MovieCard;
