import { ImgHTMLAttributes, startTransition, useCallback, useEffect, useState } from 'react';
import styles from './style.module.scss';
import { classNames } from '../../utils';
import CacheService from "../../services/CacheService";
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

interface ILazyImage extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    src: string;
    placeholder?: string;
}

const IMAGE_CACHE = 'IMAGE_CACHE';

const LazyImage: React.FC<ILazyImage> = ({ src, placeholder, ...rest }) => {
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const { isIntersecting, ref } = useIntersectionObserver<HTMLImageElement>();

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        isIntersecting && src && fetchImage({ signal });

        return () => {
            controller.abort();
        };
    }, [isIntersecting, src]);

    const fetchImage = useCallback(async ({ signal }: { signal: AbortSignal }) => {
        const imageSrc = src;
        setLoaded(false);
        ref.current && (ref.current.src = '');
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
                    ref.current && (ref.current.src = reader.result as string);
                    setLoaded(true);
                });
            };
            blobData && reader.readAsDataURL(blobData);
        } catch (_) { }
    }, []);

    return (
        <div className={classNames(
            styles.lazy_image,
            isLoaded && styles['lazy_image--loaded']
        )}
            style={{
                "backgroundImage": `url(${placeholder})`
            }}>
            <img
                ref={ref}
                {...rest}
            />
        </div>
    );
}

export default LazyImage;