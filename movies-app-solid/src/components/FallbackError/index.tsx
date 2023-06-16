import styles from './style.module.scss';
import { classNames } from '../../utils';

export function FallbackError({ error, resetErrorBoundary }: any) {
    return (
        <div class={styles.wrap} role='alert'>
            <div class={styles.container}>
                <h1 class={styles.container__heading}>Something went wrong</h1>
                <pre
                    class={
                        classNames(styles.container__text_base, styles.container__text_base__red)
                    }
                >
                    {error?.message}
                </pre>
                <div class={styles.container__try_again}>
                    <button type='button' class='btn btn-neutral' onClick={() => resetErrorBoundary()}>
                        Try again
                    </button>
                </div>
            </div>
        </div>
    );
}

export function FallbackRoutingError({ error, resetErrorBoundary }: any) {
    return <FallbackError error={error} resetErrorBoundary={resetErrorBoundary} />;
}
