import { map, Observable } from "rxjs";
import { Message } from "../models/message";
import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InjectNames } from "../../../core/inject-names";

type apiMessage = {
    message: string,
    author: {
        name: string,
        email: string | null
    }
}

@Injectable({ providedIn: 'root' })
export class GuestBookService {

    constructor(@Inject(InjectNames.GuestBookApiUrl) private url: string, private http: HttpClient) { }

    fetchMessages() {
        return this.http.get<{ [key: string]: apiMessage }>(this.url).pipe(
            map((response) => {
                if (!response) {
                    return [];
                }
                const messages: Message[] = [];
                for (const key in response) {
                    if (response.hasOwnProperty(key)) {
                        messages.push({ ...response[key], id: key });
                    }
                }
                return messages;
            }));
    }

    addMessage(message: Message): Observable<Message> {
        const request: apiMessage =
        {
            message: message.message,
            author: {
                name: message.author.name,
                email: message.author.email
            }
        };
        return this.http.post<{ name: string }>(this.url, request).pipe(
            map(response => {
                return { ...request, id: response.name }
            }));
    }
}