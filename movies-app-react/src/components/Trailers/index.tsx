import { useCallback, useState } from 'react';
import styles from './style.module.scss';
import { classNames } from '../../utils';
import { Trailer } from '../../models';

interface ITrailers {
  trailers: Trailer[];
  isLoading?: boolean;
}

const Trailers: React.FC<ITrailers> = ({ trailers, isLoading }) => {
  const [trailer, setTrailer] = useState<Trailer | null>();

  const onPlayVideo = useCallback(
    (trailer: Trailer) => {
      return () => {
        setTrailer(trailer);
        (window as any).video_dialog.showModal();
      };
    },
    [setTrailer]
  );

  return (
    <>
      <div className={styles.trailers}>
        {trailers.map((trailer) => (
          <div key={trailer.id} className={styles.trailers__trailer}>
            <img loading='lazy' src={trailer.thumbnail} />
            <div
              className={styles.trailers__trailer__overlay}
              onClick={onPlayVideo(trailer)}
            >
              <span className='material-symbols-outlined'>play_circle</span>
            </div>
          </div>
        ))}
        {trailers.length === 0 && !isLoading && (
          <h4 className={styles.no_trailers}>No Trailers Found...</h4>
        )}
      </div>
      <dialog id='video_dialog' className='modal'>
        <form
          method='dialog'
          className={classNames(
            'modal-box w-11/12 max-w-5xl',
            styles.video_dialog_box
          )}
        >
          <button
            className='btn btn-sm btn-circle btn-ghost absolute'
            onClick={() => {
              setTrailer(null);
            }}
          >
            <span className='material-symbols-outlined'>close</span>
          </button>
          <h3 className='font-bold text-lg'>{trailer?.name}</h3>
          {trailer && <object data={trailer?.video}></object>}
        </form>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Trailers;
