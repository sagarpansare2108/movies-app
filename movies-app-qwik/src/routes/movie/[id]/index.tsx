import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { routeLoader$ } from '@builder.io/qwik-city';

export const useJoke = routeLoader$(async () => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'application/json' }
  });
  return (await response.json()) as {
    id: string;
    status: number;
    joke: string;
  };
});

export default component$(() => {
  const data = useJoke();
  return (
    <>
      {data.value.joke}
    </>
  );
});

export const head: DocumentHead = {
  title: 'TMDB - Movie',
  meta: [
    {
      name: 'description',
      content: 'Movie'
    }
  ]
};
