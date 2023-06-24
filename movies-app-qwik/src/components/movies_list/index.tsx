import { component$ } from '@builder.io/qwik';
import styles from './style.module.scss';
import { Movie } from '~/models';
import MovieCard from '../movie_card';

const MoviesList = component$<{
  movies: Movie[];
  isLoading?: boolean;
}>(({ movies, isLoading }) => {
  return (
    <div class={styles.movies_list}>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} isLoading={isLoading} />
          </li>
        ))}
      </ul>
    </div>
  );
});

export default MoviesList;
