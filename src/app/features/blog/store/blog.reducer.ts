import { createReducer, on } from '@ngrx/store';
import * as BlogActions from './blog.actions';
import { BlogState, initialState } from './blog.state';

export const blogReducer = createReducer<BlogState>(
    initialState,
    //fetch posts
    on(BlogActions.fetchPosts, (state) => {
        return {
            ...state,
            isPostsLoading: true,
            postsFetchingErrorMessage: ''
        };
    }),
    on(BlogActions.fetchPostsSuccess, (state, action) => {
        return {
            ...state,
            isPostsLoading: false,
            posts: action.posts
        };
    }),
    on(BlogActions.fetchPostsFailure, (state, action) => {
        return {
            ...state,
            isPostsLoading: false,
            postsFetchingErrorMessage: action.errorMessage
        };
    }),
    //fetch comments by post id
    on(BlogActions.fetchPostCommentsByPostId, (state) => {
        return {
            ...state,
            isPostCommentsLoading: true,
            postCommentsFetchingErrorMessage: '',
            postComments: []
        };
    }),
    on(BlogActions.fetchPostCommentsByPostIdSuccess, (state, action) => {
        return {
            ...state,
            isPostCommentsLoading: false,
            postComments: action.comments
        };
    }),
    on(BlogActions.fetchPostCommentsByPostIdFailure, (state, action) => {
        return {
            ...state,
            isPostCommentsLoading: false,
            postCommentsFetchingErrorMessage: action.errorMessage
        };
    }),
    //vote
    on(BlogActions.vote, (state, action) => {
        const updatedPosts = state.posts.map(post => action.vote.postId === post.id ? { ...post, voted: true } : post);
        return {
            ...state,
            posts: updatedPosts
        };
    }),
    on(BlogActions.voteSuccess, (state, action) => {
        const updatedPosts = state.posts.map(post => action.postId === post.id ? { ...post, rating: action.averageRating } : post);
        return {
            ...state,
            posts: updatedPosts
        };
    }),
    on(BlogActions.voteFailure, (state, action) => {
        return {
            ...state,
            voteErrorMessage: action.errorMessage
        };
    })
);  