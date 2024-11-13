import { of } from "rxjs";
import { Message } from "../models/message";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class GuestBookService{
    private messages: Message[] = [
        {
            id: 1,
            author: {
                name: 'Nora Daniel',
                email: 'Nora.Daniel@google.com'
            },            
            message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'
        },
        {
            id: 2,
            author: {
                name: 'Zane Munoz',
                email: 'Zane.Munoz@inbox.lv'                
            },   
            message: 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.'
        }
    ]

    fetchMessages() {
        return of([...this.messages]);
    }

    addMessage(message: Message) {
        this.messages.push({...message, id: this.messages.length + 1});
        return of(this.messages[this.messages.length - 1]);
    }

    fetchMessageAuthor(messageId: number) {
         const author = this.messages.find(message => message.id === messageId)?.author;
         return of(author ? author : null);
    }
}