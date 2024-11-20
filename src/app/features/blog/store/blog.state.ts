import { PostComment } from '../models/post-comment';
import { Post } from '../models/post';

export interface BlogState {
    posts: Post[],
    isPostsLoading: boolean,
    postsFetchingErrorMessage: string

    postComments: PostComment[],
    isPostCommentsLoading: boolean,
    postCommentsFetchingErrorMessage: string,

    voteErrorMessage: string
}

export const initialState: BlogState = {
    posts: [],
    isPostsLoading: false,
    postsFetchingErrorMessage: '',

    postComments: [],
    isPostCommentsLoading: false,
    postCommentsFetchingErrorMessage: '',

    voteErrorMessage: ''
}
