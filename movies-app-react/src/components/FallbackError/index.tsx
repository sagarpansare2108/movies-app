import styles from './style.module.scss';
import { classNames } from '../../utils';

export function FallbackError({ error, resetErrorBoundary }: any) {
    return (
        <div className={styles.wrap} role='alert'>
            <div className={styles.container}>
                <h1 className={styles.container__heading}>Something went wrong</h1>
                <pre
                    className={
                        classNames(styles.container__text_base, styles.container__text_base__red)
                    }
                >
                    {error.message}
                </pre>
                <div className={styles.container__try_again}>
                    <button type='button' className='btn' onClick={() => resetErrorBoundary()}>
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
