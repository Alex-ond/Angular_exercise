import { createAction, props } from "@ngrx/store";
import { Post } from "../models/post";
import { PostComment } from "../models/post-comment";

enum BlogActionTypes {
    FetchPosts = '[BLog Page] Fetch posts',
    FetchPostsSuccess = '[BLog API] Fetch posts success',
    FetchPostsFailure = '[BLog API] Fetch posts failure',

    FetchPostCommentsByPostId = '[BLo Page] Fetch post comments by post id',
    FetchPostCommentsByPostIdSuccess = '[BLog API] Fetch post comments by post id success',
    FetchPostCommentsByPostIdFailure = '[BLog API] Fetch post comments by post id failure'
}

export const fetchPosts = createAction(BlogActionTypes.FetchPosts);
export const fetchPostsSuccess = createAction(BlogActionTypes.FetchPostsSuccess, props<{posts: Post[]}>());
export const fetchPostsFailure = createAction(BlogActionTypes.FetchPostsFailure, props<{errorMessage: string}>());

export const fetchPostCommentsByPostId = createAction(BlogActionTypes.FetchPostCommentsByPostId, (postId: number) => ({ postId }))
export const fetchPostCommentsByPostIdSuccess = createAction(BlogActionTypes.FetchPostCommentsByPostIdSuccess, props<{comments: PostComment[]}>());
export const fetchPostCommentsByPostIdFailure = createAction(BlogActionTypes.FetchPostCommentsByPostIdFailure, props<{errorMessage: string}>());