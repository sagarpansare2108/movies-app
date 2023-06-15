import { Accessor, Component, Setter, Show } from "solid-js";
import styles from './style.module.scss';
import { classNames } from "../../utils";

interface ISearchInput {
    value?: Accessor<string>;
    isLoading?: Accessor<boolean>;
    className?: string;
    onChange?: Setter<string>;
}

export const SearchInput: Component<ISearchInput> = ({ value, isLoading, className = '', onChange }) => {
    return (
        <div class={classNames(styles.search_input, className)}>
            <div class={styles.search_input__icon}>
                <span class='material-symbols-outlined'>search</span>
            </div>
            <input
                type='text'
                name='search'
                id='search'
                placeholder='eg. Avengers'
                value={value && value()}
                autocomplete='off'
                onInput={(e) => {
                    onChange && onChange(e.target.value);
                }}
            />
            <label for='search'>Search for a movies</label>
            <Show
                when={isLoading && isLoading()}>
                <span
                    class={classNames(
                        'loading loading-spinner loading-md',
                        styles.search_input__loading
                    )}
                ></span>
            </Show>
        </div>
    );
}