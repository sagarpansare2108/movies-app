import { component$, useStylesScoped$ } from '@builder.io/qwik';

const WelcomeHeader = component$(() => {
  useStylesScoped$(`
    .welcome_header {
        color: white;
    }
    .welcome_header h1 {
        font-size: 2rem;
        font-weight: 500;
        margin: 0;
    }
    .welcome_header h2 {
        font-size: 1.5rem;
        margin: 2px 0 0;
    }
  `);
  return (
    <div class='welcome_header'>
      <h1>Welcome.</h1>
      <h2>Millions of movies to discover. Explore now.</h2>
    </div>
  );
});

export default WelcomeHeader;
