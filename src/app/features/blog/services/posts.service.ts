import { HttpClient } from "@angular/common/http";
import { Post } from "../models/post";
import { combineLatestWith, map, Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { PostComment } from "../models/post-comment";
import { UsersService } from "./users.service";
import { InjectNames } from "../../../shared/inject-names";

@Injectable({ providedIn: 'root'})
export class PostsService {
    constructor (
        @Inject(InjectNames.BlogBaseApiUrl) private baseUrl: string, 
        private http: HttpClient,
        private usersService: UsersService) {}

    fetchPosts(): Observable<Post[]> {        
        return this.http.get<
        {
            id: number,
            userId: number,            
            title: string,
            body: string
        }[]>(`${this.baseUrl}/posts`).pipe(
            combineLatestWith(this.usersService.fetchUsers()),
            map(([posts, users]) => {
                const userMap = new Map<number, string>();
                users.forEach(user => {
                    userMap.set(user.id, user.username);
                });                
                return posts.map(post => {
                    return {...post, username: userMap.get(post.userId)};
                });          
            })
        );
    }

    fetchPostCommentsByPostId(postId: number): Observable<PostComment[]> {
        return this.http.get<
        {
            id: number,
            postId: number,
            email: string,
            name: string,
            body: string
        }[]>(`${this.baseUrl}/posts/${postId}/comments`).pipe(
            map(comments => comments.sort((a, b) => a.id - b.id))
        );
    }
}