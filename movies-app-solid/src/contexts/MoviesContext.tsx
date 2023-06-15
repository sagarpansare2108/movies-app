import { createSignal, createContext, JSX } from "solid-js";

export const MoviesContext = createContext();

export function MoviesProvider(props: { children: JSX.Element }) {
  const [query, setQuery] = createSignal<string>('');
  const value: any = {
    query,
    setQuery
  }
  return (
    <MoviesContext.Provider value={value}>
      {props.children}
    </MoviesContext.Provider>
  );
}

