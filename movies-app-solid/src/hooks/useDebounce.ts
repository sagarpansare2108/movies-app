import { Setter, onCleanup } from "solid-js";

function useDebounce(setter: Setter<string>, delay: number) {
    let timerHandle: any;

    function debounceSetter(value: any) {
        clearTimeout(timerHandle);
        timerHandle = setTimeout(() => setter(value), delay);
    }

    onCleanup(() => clearInterval(timerHandle));

    return debounceSetter;
}

export default useDebounce;