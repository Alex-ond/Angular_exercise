import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { InjectNames } from "../../../shared/inject-names";

@Injectable({ providedIn: 'root'})
export class UsersService {
    constructor (
        @Inject(InjectNames.BlogBaseApiUrl) private baseUrl: string, 
        private http: HttpClient) {}

    fetchUsers(): Observable<User[]> {        
        return this.http.get<
        {
            id: number, 
            username: string
        }[]>(`${this.baseUrl}/users`);
    }        
}