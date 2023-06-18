import { Accessor, Component, JSX, createEffect, createSignal, on, onCleanup, onMount, startTransition } from "solid-js";
import styles from './style.module.scss';
import CacheService from "../../services/CacheService";


interface ILazyImage extends Omit<JSX.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
    src: Accessor<string>;
    placeholder?: string;
    alt?: Accessor<string>;
}

const IMAGE_CACHE = 'IMAGE_CACHE';

const LazyImage: Component<ILazyImage> = ({ src, placeholder, alt, ...props }) => {
    const [isLoaded, setLoaded] = createSignal<boolean>(false);
    const [ref, setRef] = createSignal<HTMLImageElement>();
    const [isIntersecting, setIsIntersecting] = createSignal(false);

    const fetchImage = async ({ signal }: { signal: AbortSignal }) => {
        const imageElement: any = ref();
        const imageSrc = src();
        setLoaded(false);
        imageElement.src = '';
        try {
            const cache = await CacheService.get(IMAGE_CACHE, imageSrc);
            let blobData;
            if (cache) {
                blobData = await cache?.blob();
            } else {
                const response = await fetch(imageSrc, { signal });
                blobData = await response.blob();
                CacheService.set(IMAGE_CACHE, imageSrc, blobData);
            }
            const reader = new FileReader();
            reader.onload = () => {
                startTransition(() => {
                    imageElement.src = reader.result as string;
                    setLoaded(true);
                });
            };
            blobData && reader.readAsDataURL(blobData);
        } catch (_) { }
    }

    const onImageInViewPort = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            setIsIntersecting(entry.isIntersecting);
        }
    };

    const observer = new IntersectionObserver(onImageInViewPort, {
        root: null,
        rootMargin: '0px',
        threshold: 1,
    });

    createEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        isIntersecting() && src() && fetchImage({ signal });

        onCleanup(() => {
            controller.abort();
            observer.disconnect();
        });
    });

    return (
        <div classList={{
            [styles.lazy_image]: true,
            [styles['lazy_image--loaded']]: isLoaded()
        }} style={{
            "background-image": `url(${placeholder})`
        }}>
            <img
                alt={alt && alt() || ''}
                ref={(el) => {
                    setRef(el);
                    observer.observe(el);
                }}
                {...props}
            />
        </div>
    );
}

export default LazyImage;