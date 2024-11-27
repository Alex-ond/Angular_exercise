import { createAction, props } from '@ngrx/store';
import { Post } from '../models/post';
import { PostComment } from '../models/post-comment';

enum BlogActionTypes {
    FetchPosts = '[BLog Page] Fetch posts',
    FetchPostsSuccess = '[BLog API] Fetch posts success',
    FetchPostsFailure = '[BLog API] Fetch posts failure',

    FetchPostCommentsByPostId = '[BLog Page] Fetch post comments by post id',
    FetchPostCommentsByPostIdSuccess = '[BLog API] Fetch post comments by post id success',
    FetchPostCommentsByPostIdFailure = '[BLog API] Fetch post comments by post id failure',

    Vote = '[Blog Page] Vote',
    VoteSuccess = '[Blog API] Vote success',
    VoteFailure = '[Blog API] Vote failure'
}

export const fetchPosts = createAction(BlogActionTypes.FetchPosts);
export const fetchPostsSuccess = createAction(BlogActionTypes.FetchPostsSuccess, props<{ posts: Post[] }>());
export const fetchPostsFailure = createAction(BlogActionTypes.FetchPostsFailure, props<{ errorMessage: string }>());

export const fetchPostCommentsByPostId = createAction(BlogActionTypes.FetchPostCommentsByPostId, (postId: number) => ({ postId }))
export const fetchPostCommentsByPostIdSuccess = createAction(BlogActionTypes.FetchPostCommentsByPostIdSuccess, props<{ postComments: PostComment[] }>());
export const fetchPostCommentsByPostIdFailure = createAction(BlogActionTypes.FetchPostCommentsByPostIdFailure, props<{ errorMessage: string }>());

export const vote = createAction(BlogActionTypes.Vote, (postId: number, rating: number) => ({postId, rating }))
export const voteSuccess = createAction(BlogActionTypes.VoteSuccess, props<{ postId: number, averageRating: number }>());
export const voteFailure = createAction(BlogActionTypes.VoteFailure, props<{ errorMessage: string }>());