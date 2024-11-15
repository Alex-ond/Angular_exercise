import { createReducer, on } from "@ngrx/store";
import * as BlogActions from "./blog.actions";
import { BlogState, initialState } from "./blog.state";

export const blogReducer = createReducer<BlogState>(
    initialState,
    on(BlogActions.fetchPosts, (state) => {
        return { 
            ...state, 
            isPostsLoading: true, 
            postsFetchingErrorMessage: ''};
    }),
    on(BlogActions.fetchPostsSuccess, (state, action) => {
        return { 
            ...state, 
            isPostsLoading: false, 
            posts: action.posts };
    }),
    on(BlogActions.fetchPostsFailure, (state, action) => {
        return { 
            ...state, 
            isPostsLoading: false, 
            postsFetchingErrorMessage: action.errorMessage };
    }),

    on(BlogActions.fetchPostCommentsByPostId, (state) => {
        return { 
            ...state, 
            isPostCommentsLoading: true, 
            postCommentsFetchingErrorMessage: '',
            postComments: [] };
    }),
    on(BlogActions.fetchPostCommentsByPostIdSuccess, (state, action) => {
        return { 
            ...state, 
            isPostCommentsLoading: false, 
            postComments: action.comments };
    }),
    on(BlogActions.fetchPostCommentsByPostIdFailure, (state, action) => {
        return { 
            ...state, 
            isPostCommentsLoading: false, 
            postCommentsFetchingErrorMessage: action.errorMessage };
    })
);  