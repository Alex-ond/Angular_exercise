import { testMessages, testNewMessage } from '../guest-book.test-data.spec';
import * as Actions from './guest-book.actions';
import { guestBookReducer } from './guest-book.reducer';
import { GuestBookState, initialState } from './guest-book.state';

describe('Blog reducer', () => {
    it('fetchMessages', () => {
        const action = Actions.fetchMessages();
        const expectedState: GuestBookState = {
            ...initialState,
            isMessagesLoading: true
        };
        const result = guestBookReducer(initialState, action)

        expect(result).toEqual(expectedState);
    })

    it('fetchMessagesSuccess', () => {
        const action = Actions.fetchMessagesSuccess({ messages: testMessages });
        const expectedState: GuestBookState = {
            ...initialState,
            messages: testMessages
        };
        const result = guestBookReducer(initialState, action)

        expect(result).toEqual(expectedState);
    })

    it('fetchMessagesFailure', () => {
        const errorMessage = 'testError';
        const action = Actions.fetchMessagesFailure({ errorMessage });
        const expectedState: GuestBookState = {
            ...initialState,
            messagesFetchingErrorMessage: errorMessage
        };
        const result = guestBookReducer(initialState, action)

        expect(result).toEqual(expectedState);
    })

    it('addMessage', () => {
        const action = Actions.addMessage(testNewMessage);
        const expectedState: GuestBookState = {
            ...initialState,
            isMessageAdding: true
        };
        const result = guestBookReducer(initialState, action)

        expect(result).toEqual(expectedState);
    })

    it('addMessageSuccess', () => {
        const action = Actions.addMessageSuccess({ message: { ...testNewMessage, id: '3' } });
        const expectedState: GuestBookState = {
            ...initialState,
            messages: [{ ...testNewMessage, id: '3' }]
        };
        const result = guestBookReducer(initialState, action)

        expect(result).toEqual(expectedState);
    })

    it('addMessageFailure', () => {
        const errorMessage = 'testError';
        const action = Actions.addMessageFailure({ errorMessage });
        const expectedState: GuestBookState = {
            ...initialState,
            messageAddingErrorMessage: errorMessage
        };
        const result = guestBookReducer(initialState, action)

        expect(result).toEqual(expectedState);
    })

    it('selectMessage', () => {
        const messageId = '2';
        const action = Actions.selectMessage(messageId);
        const expectedState: GuestBookState = {
            ...initialState,
            selectedMessageId: messageId
        };
        const result = guestBookReducer(expectedState, action)

        expect(result).toEqual(expectedState);
    })
})