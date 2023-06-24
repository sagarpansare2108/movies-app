import { component$, noSerialize, Slot, useStylesScoped$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
// import { useLocation } from '@builder.io/qwik-city';
import Header from '~/components/header';
import { MoviesProvider } from '~/contexts/MoviesContext';
import MoviesService from '~/services/movies_service';

export const useMoviesRouteLoader = routeLoader$(async (request) => {
  const requestCategory = (request.params && request.params.category) || '';
  const category =
    (requestCategory !== '' && `/${requestCategory}`) || '/popular';
  try {
    const response = await MoviesService.getMovies({
      category: category,
      page: 1
    });
    return noSerialize(response);
  } catch (e) {
    // console.log(e);
  }
});

export default component$(() => {
  useStylesScoped$(`
    .main {
      padding-top: 100px;
    }
  `);
  const data = useMoviesRouteLoader();
  return (
    <>
      <MoviesProvider data={data.value}>
        <Header />
        <main class='main'>
          {/* {loc.isNavigating && 'Loading....'} */}
          <Slot />
        </main>
      </MoviesProvider>
    </>
  );
});
