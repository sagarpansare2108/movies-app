import { memo, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import { Movie } from '../../models';
import { classNames, startViewTransition } from '../../utils';
import LazyImage from '../LazyImage';
import placeholderImage from '../../assets/placeholder.jpeg';
import { flushSync } from 'react-dom';

const MovieCard: React.FC<{ movie: Movie; isLoading?: boolean }> = ({
  movie,
  isLoading = false
}) => {
  const navigate = useNavigate();

  const navigateToMovie = useCallback((to: string) => {
    startViewTransition({
      updateDOM: () => {
        flushSync(() => {
          navigate(to);
        });
      }
    });
  }, [navigate]);

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
        to={`/movie/${movie.id}`}
        onClick={(e) => {
          e.preventDefault();
          navigateToMovie(`/movie/${movie.id}`)
        }}
        className={classNames(
          styles.movie_card__image,
          isLoading && styles['movie_card__image--loading']
        )}
        style={isLoading ? { pointerEvents: 'none' } : undefined}
      >
        <LazyImage
          src={movie.small_poster_path}
          placeholder={placeholderImage}
          alt={movie.title}
        />
      </Link>
      <div className={styles.movie_card__title}>
        {(!isLoading && (
          <Link
            to={`/movie/${movie.id}`}
            onClick={(e) => {
              e.preventDefault();
              navigateToMovie(`/movie/${movie.id}`)
            }}
            style={isLoading ? { pointerEvents: 'none' } : undefined}
          >
            {movie.title}
          </Link>
        )) || <span className='shimmer_blured'>Dummy Movie</span>}
      </div>
    </div>
  );
};

export default memo(MovieCard);
