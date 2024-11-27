import { testState } from '../blog.test-data.spec';
import * as Selectors from './blog.selectors'
import { BlogState } from './blog.state'

describe('Blog selectors', () => {
    it('postsSelector', () => {
        const result = Selectors.postsSelector.projector(testState);

        expect(result).toEqual(testState.posts);
    })

    it('isPostsLoadingSelector', () => {
        const result = Selectors.isPostsLoadingSelector.projector(testState);

        expect(result).toEqual(testState.isPostsLoading);
    })

    it('isPostsLoadingSelector', () => {
        const result = Selectors.postsFetchingErrorMessageSelector.projector(testState);

        expect(result).toEqual(testState.postsFetchingErrorMessage);
    })

    it('postCommentsSelector', () => {
        const result = Selectors.postCommentsSelector.projector(testState);

        expect(result).toEqual(testState.postComments);
    })

    it('isPostCommentsLoadingSelector', () => {
        const result = Selectors.isPostCommentsLoadingSelector.projector(testState);

        expect(result).toEqual(testState.isPostCommentsLoading);
    })

    it('postCommentsFetchingErrorMessageSelector', () => {
        const result = Selectors.postCommentsFetchingErrorMessageSelector.projector(testState);
        
        expect(result).toEqual(testState.postCommentsFetchingErrorMessage);
    })
})