import { createAction, props } from "@ngrx/store";
import { Message } from "../models/message";

enum BlogActionTypes {
    FetchMessages = '[Guest book Page] Fetch messages',
    FetchMessagesSuccess = '[Guest book API] Fetch messages success',
    FetchMessagesFailure = '[Guest book API] Fetch messages failure',

    AddMessage = '[Guest book Page] Add message',
    AddMessageSuccess = '[Guest book API] Add message success',
    AddMessageFailure = '[Guest book API] Add message failure',

    SelectMessage = '[Guest book Page] Select message',
}

export const fetchMessages = createAction(BlogActionTypes.FetchMessages);
export const fetchMessagesSuccess = createAction(BlogActionTypes.FetchMessagesSuccess, props<{messages: Message[]}>());
export const fetchMessagesFailure = createAction(BlogActionTypes.FetchMessagesFailure, props<{errorMessage: string}>());

export const addMessage = createAction(BlogActionTypes.AddMessage, (message: Message) => ({ message }))
export const addMessageSuccess = createAction(BlogActionTypes.AddMessageSuccess, props<{message: Message}>());
export const addMessageFailure = createAction(BlogActionTypes.AddMessageFailure, props<{errorMessage: string}>());

export const selectMessage = createAction(BlogActionTypes.SelectMessage, (messageId: string) => ({messageId}));
