import { testState } from '../guest-book.test-data.spec';
import * as Selectors from './guest-book.selectors'

describe('Guest book selectors', () => {
    it('postsSelector', () => {
        const result = Selectors.messagesSelector.projector(testState);

        expect(result).toEqual(testState.messages);
    })

    it('isMessagesLoadingSelector', () => {
        const result = Selectors.isMessagesLoadingSelector.projector(testState);

        expect(result).toEqual(testState.isMessagesLoading);
    })

    it('messagesFetchingErrorMessageSelector', () => {
        const result = Selectors.messagesFetchingErrorMessageSelector.projector(testState);

        expect(result).toEqual(testState.messagesFetchingErrorMessage);
    })

    it('messageAddingErrorMessage', () => {
        const result = Selectors.messageAddingErrorMessage.projector(testState);

        expect(result).toEqual(testState.messageAddingErrorMessage);
    })

    it('selectedMessageAuthorSelector', () => {
        const result = Selectors.selectedMessageAuthorSelector.projector(testState);
        
        expect(result).toEqual(testState.messages[0].author);
    })
})