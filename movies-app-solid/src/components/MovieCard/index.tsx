import { Component } from 'solid-js';
import { A } from '@solidjs/router';
import styles from './style.module.scss';
import { Movie } from '../../models';
import { classNames } from '../../utils';

const MovieCard: Component<{ movie: Movie; isLoading?: boolean }> = ({
  movie,
  isLoading = false
}) => {
  return (
    <div class={styles.movie_card}>
      <div
        class={classNames(
          styles.movie_card__rating,
          isLoading && 'shimmer_blured'
        )}
      >
        <span class='material-symbols-outlined'>star</span>
        {movie.vote_average.toFixed(1)}
      </div>
      <A
        class={classNames(
          styles.movie_card__image,
          isLoading && styles.movie_card__image_loading
        )}
        href={`/movie/${movie.id}`}
        style={isLoading ? { 'pointer-events': 'none' } : undefined}
      >
        {!isLoading && movie.small_poster_path && (
          <img
            loading='lazy'
            src={movie.small_poster_path}
            srcSet={`${movie.small_poster_path} 1x, ${movie.medium_poster_path} 2x`}
            alt={movie.title}
          />
        )}
      </A>
      <div class={styles.movie_card__title}>
        {(!isLoading && (
          <A
            href={`/movie/${movie.id}`}
            style={isLoading ? { 'pointer-events': 'none' } : undefined}
          >
            {movie.title}
          </A>
        )) || <span class='shimmer_blured'>Dummy Movie</span>}
      </div>
    </div>
  );
};

export default MovieCard;
