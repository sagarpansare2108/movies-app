import { $, component$, useSignal } from '@builder.io/qwik';
import styles from './style.module.scss';

export default component$(() => {
  const count = useSignal(70);

  const setCount = $((newValue: number) => {
    if (newValue < 0 || newValue > 100) {
      return;
    }
    count.value = newValue;
  });

  return (
    <>
      <div class={styles.counter_wrapper}>
        <button
          class='btn btn-primary'
          onClick$={() => setCount(count.value - 1)}
        >
          -
        </button>
        <h1>{count.value}</h1>
        <button
          class='btn btn-primary'
          onClick$={() => setCount(count.value + 1)}
        >
          +
        </button>
      </div>
    </>
  );
});
