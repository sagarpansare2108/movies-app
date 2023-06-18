import { Accessor, Component, Index, Show } from 'solid-js';
import styles from './style.module.scss';
import { Review } from '../../models';
import Loader from '../Loader';

interface IReviews {
    reviews: Accessor<Review[]>;
    isLoading: Accessor<boolean>;
}

const Reviews: Component<IReviews> = ({ reviews, isLoading }) => {
    return (
        <div class={styles.reviews}>
            <Index each={reviews()}>
                {(review) => (
                    <div
                        classList={{
                            'chat chat-start': true,
                            [styles.reviews__review]: true
                        }}
                    >
                        <div
                            classList={{
                                'chat-image avatar': true,
                                [styles.reviews__review__avatar]: true
                            }}
                        >
                            <div class='w-10 rounded-full'>
                                {review().profilePic && (
                                    <img loading='lazy' src={review().profilePic} alt={review().authorName} />
                                )}
                            </div>
                        </div>
                        <div
                            classList={{
                                'chat-header': true,
                                [styles.reviews__review__author]: true
                            }}
                        >
                            {review().authorName}
                        </div>
                        <div
                            classList={{
                                'chat-bubble': true,
                                [styles.reviews__review__content]: true
                            }}
                        >
                            {review().content}
                        </div>
                    </div>
                )
                }
            </Index >
            <Show when={reviews().length === 0 && !isLoading()}>
                <h4 class={styles.no_reviews}>No Reviews Found...</h4>
            </Show>
            <Show when={isLoading()}>
                <Loader />
            </Show>
        </div >
    );
};

export default Reviews;
