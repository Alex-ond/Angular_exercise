import { createAction, props } from "@ngrx/store";
import { Message } from "../models/message";
import { Author } from "../models/author";

enum BlogActionTypes {
    FetchMessages = '[Guest book Page] Fetch messages',
    FetchMessagesSuccess = '[Guest book API] Fetch messages success',
    FetchMessagesFailure = '[Guest book API] Fetch messages failure',

    AddMessage = '[Guest book Page] Add message',
    AddMessageSuccess = '[Guest book API] Add message success',
    AddMessageFailure = '[Guest book API] Add message failure',

    FetchMessageAuthor = '[Guest book Page] Fetch message author',
    FetchMessageAuthorSuccess = '[Guest book API] Fetch message author success',
    FetchMessageAuthorFailure = '[Guest book API] Fetch message author failure'
}

export const fetchMessages = createAction(BlogActionTypes.FetchMessages);
export const fetchMessagesSuccess = createAction(BlogActionTypes.FetchMessagesSuccess, props<{messages: Message[]}>());
export const fetchMessagesFailure = createAction(BlogActionTypes.FetchMessagesFailure, props<{errorMessage: string}>());

export const addMessage = createAction(BlogActionTypes.AddMessage, (message: Message) => ({ message }))
export const addMessageSuccess = createAction(BlogActionTypes.AddMessageSuccess, props<{message: Message}>());
export const addMessageFailure = createAction(BlogActionTypes.AddMessageFailure, props<{errorMessage: string}>());

export const fetchMessageAuthor = createAction(BlogActionTypes.FetchMessageAuthor, (messageId: number) => ({messageId}));
export const fetchMessageAuthorSuccess = createAction(BlogActionTypes.FetchMessageAuthorSuccess, props<{author: Author | null}>());
export const fetchMessageAuthorFailure = createAction(BlogActionTypes.FetchMessageAuthorFailure, props<{errorMessage: string}>());
