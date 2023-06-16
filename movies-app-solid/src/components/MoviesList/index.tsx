import { Accessor, Component, For } from 'solid-js';
import styles from './style.module.scss';
import { Movie } from '../../models';
import MovieCard from '../MovieCard';

const MoviesList: Component<{
  movies: Accessor<Movie[]>;
  isLoading?: Accessor<boolean>;
  isCategoryLoading?: boolean;
}> = ({ movies, isLoading, isCategoryLoading }) => {
  const dummyMovies = [
    new Movie({ id: 1 }),
    new Movie({ id: 2 }),
    new Movie({ id: 3 }),
    new Movie({ id: 4 }),
    new Movie({ id: 5 }),
    new Movie({ id: 6 }),
    new Movie({ id: 7 }),
    new Movie({ id: 8 })
  ];

  return (
    <div class={styles.movies_list}>
      <ul>
        <For each={movies()}>
          {(movie) => (
            <li>
              <MovieCard movie={movie} isLoading={isCategoryLoading} />
            </li>
          )}
        </For>
        {isLoading && isLoading() && (
          <For each={dummyMovies}>
            {(movie) => (
              <li>
                <MovieCard movie={movie} isLoading={true} />
              </li>
            )}
          </For>
        )}
      </ul>
    </div>
  );
};

export default MoviesList;
