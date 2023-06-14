import styles from './style.module.scss';
import { classNames } from '../../utils';
import { Review } from '../../models';

interface IReviews {
  reviews: Review[];
}

const Reviews: React.FC<IReviews> = ({ reviews }) => {
  return (
    <div className={styles.reviews}>
      {reviews.map((review) => (
        <div
          key={review.id}
          className={classNames('chat chat-start', styles.reviews__review)}
        >
          <div className={classNames('chat-image avatar', styles.reviews__review__avatar)}>
            <div className='w-10 rounded-full'>
              {review.profilePic && <img loading='lazy' src={review.profilePic} />}
            </div>
          </div>
          <div
            className={classNames(
              'chat-header',
              styles.reviews__review__author
            )}
          >
            {review.authorName}
          </div>
          <div
            className={classNames(
              'chat-bubble',
              styles.reviews__review__content
            )}
          >
            {review.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
