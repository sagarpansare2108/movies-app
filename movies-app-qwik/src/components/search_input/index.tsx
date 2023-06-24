import { $, component$ } from '@builder.io/qwik';
import { classNames } from '~/utils';
import styles from './style.module.scss';

interface ISearchInput {
  value?: string;
  isLoading?: boolean;
  onChange?: (value: string) => void;
}

const SearchInput = component$<ISearchInput>(
  ({ value, isLoading, onChange }) => {
    return (
      <div class={styles.search_input}>
        <div class={styles.search_input__icon}>
          <span class='material-symbols-outlined'>search</span>
        </div>
        <input
          type='text'
          name='search'
          id='search'
          placeholder='eg. Avengers'
          value={value}
          autoComplete='off'
          onInput$={$((e: any) => {
            onChange && onChange(e.target?.value);
          })}
        />
        <label for='search'>Search for a movies</label>
        {isLoading && (
          <span
            class={classNames(
              'loading loading-spinner loading-md',
              styles.search_input__loading
            )}
          ></span>
        )}
      </div>
    );
  }
);

export default SearchInput;