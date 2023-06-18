import { Accessor, Component, For, Index, Show } from 'solid-js';
import styles from './style.module.scss';
import { Movie } from '../../models';
import MovieCard from '../MovieCard';

const MoviesList: Component<{
  movies: Accessor<Movie[]>;
  isLoading?: Accessor<boolean>;
  isRouting?: Accessor<boolean>;
  isLoadMoreLoading?: Accessor<boolean>;
}> = ({
  movies,
  isLoading = () => false,
  isRouting = () => false,
  isLoadMoreLoading = () => false
}) => {
    const dummyMovies = Array(20).fill(1).map((_, i) => {
      return new Movie({ id: i + 1, title: 'Placeholder title' });
    });

    return (
      <div class={styles.movies_list}>
        <ul>
          <Index each={movies()}>
            {(movie, _) => (
              <li>
                <MovieCard
                  movie={movie}
                  isLoading={isLoading}
                  isRouting={isRouting}
                  isLoadMoreLoading={isLoadMoreLoading} />
              </li>
            )}
          </Index>
          <Show when={isLoading() && !isRouting()}>
            <For each={dummyMovies}>
              {(movie) => (
                <li>
                  <MovieCard movie={() => movie} isLoading={() => true} />
                </li>
              )}
            </For>
          </Show>
        </ul>
      </div>
    );
  };

export default MoviesList;
