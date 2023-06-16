import { ErrorBoundary, type Component } from 'solid-js';
import AppRouter from './Router';
import { FallbackError } from './components/FallbackError';

const App: Component = () => {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <FallbackError error={error} resetErrorBoundary={reset} />
      )}
    >
      <AppRouter />
    </ErrorBoundary>
  );
};

export default App;
