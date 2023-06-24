import { $, component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import WelcomeHeader from '~/components/welcome_header';
import SearchInput from '~/components/search_input';
import { useMovies } from '~/hooks/useMovies';

export default component$(() => {
  useStylesScoped$(`
    .movies_search_input {
      margin-top: 20px;
    }
  `);

  const { query, setQuery } = useMovies();

  const onChange = $((value: string) => {
    setQuery && setQuery(value);
  });

  return (
    <div class='container'>
      <WelcomeHeader />
      <div class='movies_search_input'>
        <SearchInput value={query.value} onChange={onChange} />
      </div>
      <Slot />
    </div>
  );
});

export const head: DocumentHead = ({ head }) => {
  return {
    title: `TMDB - ${head.title}`
  };
};
