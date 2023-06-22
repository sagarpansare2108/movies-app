import { useEffect, useRef, useState } from "react";

export default function useIntersectionObserver<T extends Element>(options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                }
            },
            options
        );

        if (ref.current) {
            observer.observe(ref.current);
        }


        return () => {
            observer.disconnect();
        }
    }, [isIntersecting, ref, setIsIntersecting]);

    return {
        ref,
        isIntersecting
    };
}