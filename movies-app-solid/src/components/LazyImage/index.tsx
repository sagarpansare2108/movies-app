import { Accessor, Component, JSX, createEffect, createSignal, onCleanup, startTransition } from "solid-js";
import styles from './style.module.scss';
import CacheService from "../../services/CacheService";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";


interface ILazyImage extends Omit<JSX.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
    src: Accessor<string>;
    placeholder?: string;
    alt?: Accessor<string>;
}

const IMAGE_CACHE = 'IMAGE_CACHE';

const LazyImage: Component<ILazyImage> = ({ src, placeholder, alt, ...props }) => {
    const [isLoaded, setLoaded] = createSignal<boolean>(false);
    const { ref, setRef, isIntersecting } = useIntersectionObserver<HTMLImageElement>();

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

    createEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        isIntersecting() && src() && fetchImage({ signal });

        onCleanup(() => {
            controller.abort();
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
                }}
                {...props}
            />
        </div>
    );
}

export default LazyImage;