import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import styles from './style.module.scss';
import { Movie } from '~/models';
import { classNames } from '~/utils';

const MovieCard = component$<{ movie: Movie; isLoading?: boolean }>(
  ({ movie, isLoading }) => {
    
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
        <Link
          href={`/movie/${movie.id}`}
          class={classNames(
            styles.movie_card__image,
            isLoading && styles['movie_card__image--loading']
          )}
          style={isLoading ? { pointerEvents: 'none' } : undefined}
        >
          <img loading='lazy' src={movie.small_poster_path} alt={movie.title} />
        </Link>
        <div class={styles.movie_card__title}>
          {(!isLoading && (
            <Link
              href={`/movie/${movie.id}`}
              style={isLoading ? { pointerEvents: 'none' } : undefined}
            >
              {movie.title}
            </Link>
          )) || <span class='shimmer_blured'>Dummy Movie</span>}
        </div>
      </div>
    );
  }
);

export default MovieCard;
