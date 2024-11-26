import { testPostComments, testPosts } from "../blog.test-data.spec";
import { Post } from "../models/post";
import { PostComment } from "../models/post-comment";
import * as Actions from "./blog.actions";
import { blogReducer } from "./blog.reducer";
import { BlogState, initialState } from "./blog.state";

describe('blogReducer', () => {
    it('fetchPosts', () => {
        const action = Actions.fetchPosts();
        const expectedState: BlogState = {
            ...initialState,
            isPostsLoading: true
        };
        const result = blogReducer(initialState, action)

        expect(result).toEqual(expectedState);
    });

    it('fetchPostsSuccess', () => {
        const action = Actions.fetchPostsSuccess({ posts: testPosts });
        const expectedState: BlogState = {
            ...initialState,
            posts: testPosts
        };
        const result = blogReducer(initialState, action)

        expect(result).toEqual(expectedState);
    });

    it('fetchPostsFailure', () => {
        const errorMessage = 'testError';
        const action = Actions.fetchPostsFailure({ errorMessage });
        const expectedState: BlogState = {
            ...initialState,
            postsFetchingErrorMessage: errorMessage
        };
        const result = blogReducer(initialState, action)

        expect(result).toEqual(expectedState);
    });

    it('fetchPostCommentsByPostId', () => {
        const postId = 1;
        const action = Actions.fetchPostCommentsByPostId(postId);
        const expectedState: BlogState = {
            ...initialState,
            isPostCommentsLoading: true
        };
        const result = blogReducer(initialState, action)

        expect(result).toEqual(expectedState);
    });

    it('fetchPostCommentsByPostIdSuccess', () => {

        const action = Actions.fetchPostCommentsByPostIdSuccess({ postComments: testPostComments });
        const expectedState: BlogState = {
            ...initialState,
            postComments: testPostComments
        };
        const result = blogReducer(initialState, action)

        expect(result).toEqual(expectedState);
    });

    it('fetchPostCommentsByPostIdFailure', () => {
        const errorMessage = 'testError';
        const action = Actions.fetchPostCommentsByPostIdFailure({ errorMessage });
        const expectedState: BlogState = {
            ...initialState,
            postCommentsFetchingErrorMessage: errorMessage
        };
        const result = blogReducer(initialState, action)

        expect(result).toEqual(expectedState);
    });

    it('vote', () => {
        const postId = 1;
        const rating = 2;
        const action = Actions.vote(postId, rating);
        const posts: Post[] = [
            {
                id: 1,
                title: 'title1',
                body: 'body1',
                rating: 1,
                userId: 1,
                voted: false,
                username: 'Alex'
            }
        ]
        const stateWithPosts = { ...initialState, posts };
        const expectedState: BlogState = {
            ...stateWithPosts,
            posts: posts.map((post) => {
                return { ...post, voted: true };
            })
        };
        const result = blogReducer(stateWithPosts, action)

        expect(result).toEqual(expectedState);
    });

    it('voteSuccess', () => {
        const postId = 1;
        const averageRating = 2;
        const action = Actions.voteSuccess({ postId, averageRating });
        const posts: Post[] = [
            {
                id: 1,
                title: 'title1',
                body: 'body1',
                rating: 1,
                userId: 1,
                voted: true,
                username: 'Alex'
            }
        ]
        const stateWithPosts = { ...initialState, posts };
        const expectedState: BlogState = {
            ...stateWithPosts,
            posts: posts.map((post) => {
                return { ...post, voted: true, rating: 2 };
            })
        };
        const result = blogReducer(stateWithPosts, action)

        expect(result).toEqual(expectedState);
    });

    it('voteFailure', () => {
        const errorMessage = 'testError';
        const action = Actions.voteFailure({ errorMessage });
        const expectedState: BlogState = {
            ...initialState,
            voteErrorMessage: errorMessage
        };
        const result = blogReducer(initialState, action)

        expect(result).toEqual(expectedState);
    });
})