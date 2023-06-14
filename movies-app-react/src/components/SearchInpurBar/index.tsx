import { classNames } from '../../utils';
import styles from './style.module.scss';
import { MutableRefObject, memo, useCallback, useRef } from 'react';

const SearchInputBar: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
  isLoading?: boolean;
}> = ({ value, onChange, isLoading = false }) => {
  const inputRef: MutableRefObject<any> = useRef();

  const handleChange = useCallback(() => {
    const input: any = inputRef && inputRef.current;
    onChange && onChange(input.value || '');
  }, [inputRef, onChange]);

  console.log('Render SearchInputBar...');

  return (
    <div className={styles.search_input}>
      <div className={styles.search_input__icon}>
        <span className='material-symbols-outlined'>search</span>
      </div>
      <input
        ref={inputRef}
        type='text'
        name='search'
        id='search'
        placeholder='eg. Avengers'
        value={value}
        onChange={handleChange}
        autoComplete='off'
      />
      <label htmlFor='search'>Search for a movies</label>
      <SearchInputBarLoading isLoading={isLoading} />
    </div>
  );
};

const SearchInputBarLoading: React.FC<{
  isLoading: boolean;
}> = memo(({ isLoading }) => {
  console.log('Render SearchInputBarLoading...');
  return (
    <>
      {isLoading && (
        <span
          className={classNames(
            'loading loading-spinner loading-md',
            styles.search_input__loading
          )}
        ></span>
      )}
    </>
  );
});

export default memo(SearchInputBar);
