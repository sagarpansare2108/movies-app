import { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import { Movie } from '../../models';
import { classNames } from '../../utils';

const MovieCard: React.FC<{ movie: Movie; isLoading?: boolean }> = ({
  movie,
  isLoading = false
}) => {
  return (
    <div className={styles.movie_card}>
      <div
        className={classNames(
          styles.movie_card__rating,
          isLoading && 'shimmer_blured'
        )}
      >
        <span className='material-symbols-outlined'>star</span>
        {movie.vote_average.toFixed(1)}
      </div>
      <Link
        className={classNames(
          styles.movie_card__image,
          isLoading && styles.movie_card__image_loading
        )}
        to={`/movie/${movie.id}`}
      >
        {!isLoading && movie.small_poster_path && (
          <img
            loading='lazy'
            src={movie.small_poster_path}
            srcSet={`${movie.small_poster_path} 1x, ${movie.medium_poster_path} 2x`}
            alt={movie.title}
          />
        )}
      </Link>
      <div className={styles.movie_card__title}>
        {(!isLoading && (
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        )) || <span className='shimmer_blured'>Dummy Movie</span>}
      </div>
    </div>
  );
};

export default memo(MovieCard);
