import { memo, useMemo } from 'react';
import styles from './style.module.scss';
import { Movie } from '../../models';
import MovieCard from '../MovieCard';

const MoviesList: React.FC<{
  movies: Movie[];
  isLoading?: boolean;
  isCategoryLoading?: boolean;
}> = ({ movies, isLoading, isCategoryLoading }) => {
  const dummyMovies = useMemo(
    () => [
      new Movie({ id: 1 }),
      new Movie({ id: 2 }),
      new Movie({ id: 3 }),
      new Movie({ id: 4 }),
      new Movie({ id: 5 }),
      new Movie({ id: 6 }),
      new Movie({ id: 7 }),
      new Movie({ id: 8 })
    ],
    []
  );

  return (
    <div className={styles.movies_list}>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} isLoading={isCategoryLoading} />
          </li>
        ))}
        {isLoading &&
          dummyMovies.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} isLoading={true} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default memo(MoviesList);
