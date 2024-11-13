import { AppState } from "../../store/app.state";
import { Author } from "../models/author";
import { Message } from "../models/message";

export interface GuestBookState extends AppState{
    messages: Message[],
    isMessagesLoading: boolean,
    messagesFetchingErrorMessage: string,

    isMessageAdding: boolean,
    messageAddingErrorMessage: string,

    messageAuthor: Author | null,
    messageAuthorFetchingErrorMessage: string
}

export const initialState: GuestBookState = {    
    messages: [],
    isMessagesLoading: false,    
    messagesFetchingErrorMessage: '',

    isMessageAdding: false,
    messageAddingErrorMessage: '',

    messageAuthor: null,
    messageAuthorFetchingErrorMessage: ''
}
