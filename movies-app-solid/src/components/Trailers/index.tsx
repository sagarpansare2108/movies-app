import { Accessor, Component, Index, Show, createSignal } from 'solid-js';
import styles from './style.module.scss';
import { Trailer } from '../../models';
import Loader from '../Loader';

interface ITrailers {
    trailers: Accessor<Trailer[]>;
    isLoading: Accessor<boolean>;
}

const Trailers: Component<ITrailers> = ({ trailers, isLoading }) => {
    const [trailer, setTrailer] = createSignal<Trailer | null>();
    const [isVideoLoading, setVideoLoading] = createSignal<boolean>(true);

    const onPlayVideo = (trailer: Trailer) => {
        return () => {
            setTrailer(trailer);
            (window as any).video_dialog.showModal();
        }
    };

    return (
        <>
            <div class={styles.trailers}>
                <Index each={trailers()}>
                    {(trailer) => (
                        <div class={styles.trailers__trailer}>
                            <img loading='lazy' src={trailer().thumbnail} />
                            <div
                                class={styles.trailers__trailer__overlay}
                                onClick={onPlayVideo(trailer())}
                            >
                                <span class='material-symbols-outlined'>play_circle</span>
                            </div>
                        </div>
                    )}
                </Index>
                <Show when={trailers().length === 0 && !isLoading()}>
                    <h4 class={styles.no_trailers}>No Trailers Found...</h4>
                </Show>
                <Show when={isLoading()}>
                    <Loader />
                </Show>
            </div>
            <dialog id='video_dialog' class='modal'>
                <form
                    method='dialog'
                    classList={{
                        'modal-box w-11/12 max-w-5xl': true,
                        [styles.video_dialog_box]: true
                    }}
                >
                    <button
                        class='btn btn-sm btn-circle btn-ghost absolute'
                        onClick={() => {
                            setTrailer(null);
                        }}
                    >
                        <span class='material-symbols-outlined'>close</span>
                    </button>
                    <h3 class='font-bold text-lg'>{trailer()?.name}</h3>
                    <Show when={trailer()}>
                        <object data={trailer()?.video} onLoad={() => {
                            setVideoLoading(false)
                        }}></object>
                    </Show>
                    <Show when={isVideoLoading()}>
                        <Loader />
                    </Show>
                </form>
                <form method='dialog' class='modal-backdrop'>
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
};

export default Trailers;
