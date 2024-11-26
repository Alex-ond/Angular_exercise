import { createReducer, on } from "@ngrx/store";
import * as BlogActions from "./guest-book.actions";
import { GuestBookState, initialState } from "./guest-book.state";

export const guestBookReducer = createReducer<GuestBookState>(
    initialState,
    //fetch messages
    on(BlogActions.fetchMessages, (state) => {
        return { 
            ...state, 
            isMessagesLoading: true, 
            messagesFetchingErrorMessage: '', 
            messages: [] };
    }),
    on(BlogActions.fetchMessagesSuccess, (state, action) => {
        return { 
            ...state, 
            isMessagesLoading: false, 
            messages: action.messages };
    }),
    on(BlogActions.fetchMessagesFailure, (state, action) => {
        return { 
            ...state, 
            isMessagesLoading: false, 
            messagesFetchingErrorMessage: action.errorMessage };
    }),

    //add message
    on(BlogActions.addMessage, (state) => {
        return { 
            ...state, 
            isMessageAdding: true, 
            messageAddingErrorMessage: '' };
    }),
    on(BlogActions.addMessageSuccess, (state, action) => {
        const messages = [...state.messages];        
        messages.push(action.message);
        return { 
            ...state, 
            isMessageAdding: false,
            messages: messages};
    }),
    on(BlogActions.addMessageFailure, (state, action) => {
        return { 
            ...state, 
            isMessagesLoading: false, 
            messageAddingErrorMessage: action.errorMessage };
    }),

    //select message
    on(BlogActions.selectMessage, (state, action) => {
        return { 
            ...state, 
            selectedMessageId: action.messageId
        };
    }),
);  