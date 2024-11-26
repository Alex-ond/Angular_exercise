import { Message } from "../models/message";

export interface GuestBookState {
    messages: Message[],
    isMessagesLoading: boolean,
    messagesFetchingErrorMessage: string,

    isMessageAdding: boolean,
    messageAddingErrorMessage: string,

    selectedMessageId?: string
}

export const initialState: GuestBookState = {    
    messages: [],
    isMessagesLoading: false,    
    messagesFetchingErrorMessage: '',

    isMessageAdding: false,
    messageAddingErrorMessage: ''
}
