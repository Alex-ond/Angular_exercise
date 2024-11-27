import { Author } from "./models/author";
import { Message } from "./models/message";
import { ApiMessages } from "./services/guest-book.service";
import { GuestBookState } from "./store/guest-book.state";

export const testaAuthor: Author = {
    name: 'Alex',
    email: 'email1'
}

export const testMessage: Message = {
    id: '1',
    message: 'test',
    author: {
        name: 'Alex',
        email: 'email1'
    }
}

export const testNewMessage: Message = {
    id: '',
    message: '1'.repeat(20),
    author: {
        email: 'test@test.com',
        name: 'name'
    }
}

export const testMessages: Message[] = [
    {
        id: '1',
        message: 'message1',
        author: {
            name: 'Alex',
            email: 'email1'
        }
    },
    {
        id: '2',
        message: 'message2',
        author: {
            name: 'Anna',
            email: 'email2'
        }
    }
]

export const testCachedMessages: Message[] = [
    ...testMessages,
    {

        id: '3', message: 'message3', author: {
            name: 'John',
            email: 'email3'
        }
    }
]

export const testApiMessages: ApiMessages = {
    '1': {
        message: 'message1',
        author: {
            name: 'Alex',
            email: 'email1'
        }
    },
    '2': {
        message: 'message2',
        author: {
            name: 'Anna',
            email: 'email2'
        }
    }
}

export const testState: GuestBookState = {
    isMessageAdding: true,
    isMessagesLoading: true,
    messageAddingErrorMessage: 'messageAddingErrorMessage',
    messagesFetchingErrorMessage: 'messagesFetchingErrorMessage',
    selectedMessageId: '1',
    messages: [
        {
            id: '1',
            message: 'message1',
            author: {
                name: 'Alex',
                email: 'email1'
            }
        },
        {
            id: '2',
            message: 'message2',
            author: {
                name: 'Anna',
                email: 'email2'
            }
        }
    ]
}