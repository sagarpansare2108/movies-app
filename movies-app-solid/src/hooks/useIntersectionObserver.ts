import { createEffect, createSignal, onCleanup } from "solid-js";

export default function useIntersectionObserver<T extends Element>(options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
}) {
    const [ref, setRef] = createSignal<T | undefined>();
    const [isIntersecting, setIsIntersecting] = createSignal(false);

    createEffect(() => {
        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                }
            },
            options
        );

        const element = ref();
        element && observer.observe(element);

        onCleanup(() => {
            observer.disconnect();
        });
    });

    return {
        ref,
        isIntersecting,
        setRef
    };
}