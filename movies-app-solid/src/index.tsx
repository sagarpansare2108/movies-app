// @refresh reload
import { render } from 'solid-js/web';

import './index.scss';
import App from './App';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const dispose = render(() => <App />, root!);

if (import.meta.hot && import.meta.env.DEV) {
  import.meta.hot.dispose(dispose);
}
