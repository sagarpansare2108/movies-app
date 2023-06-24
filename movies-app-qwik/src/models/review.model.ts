import { REVIEW_PROFILE_IMAGE_PATH } from '../constants';

export class Review {
    id: string;
    authorName: string;
    profilePic: string;
    content: string;

    constructor(data?: any) {
        this.id = data && data.id || '';
        const authorDetails = data && data.author_details || null;
        this.authorName = authorDetails && (authorDetails.name || authorDetails.username) || '';
        let avatarPath = authorDetails && authorDetails.avatar_path || '';
        if (avatarPath !== '') {
            if (avatarPath.startsWith('/'))
                avatarPath = avatarPath.substring(1);
            this.profilePic = /^(http|https):\/\//.test(avatarPath) ? avatarPath : `${REVIEW_PROFILE_IMAGE_PATH}/${avatarPath}`;
        } else {
            this.profilePic = '';
        }
        this.content = data && data.content || '';
    }
}