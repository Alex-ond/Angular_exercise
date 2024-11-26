import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { combineLatestWith, map, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { PostComment } from '../models/post-comment';
import { UsersService } from './users.service';
import { InjectNames } from '../../../core/inject-names';
import { RatingService } from './rating.service';

@Injectable({ providedIn: 'root' })
export class PostsService {
    constructor(
        @Inject(InjectNames.BlogBaseApiUrl) private baseUrl: string,
        private http: HttpClient,
        private usersService: UsersService,
        private ratingService: RatingService) { }

    fetchPosts(): Observable<Post[]> {
        return this.http.get<
            {
                id: number,
                userId: number,
                title: string,
                body: string
            }[]>(`${this.baseUrl}/posts`).pipe(
                combineLatestWith(this.usersService.fetchUsers(), this.ratingService.fetchRatingMap()),
                map(([posts, users, ratingMap]) => {
                    const userMap = new Map<number, string>();
                    users.forEach(user => {
                        userMap.set(user.id, user.username);
                    });
                    return posts.map(post => {
                        const postRating = ratingMap.get(post.id);
                        return {
                            ...post,
                            username: userMap.get(post.userId),
                            rating: postRating?.averageRating ?? 0,
                            voted: postRating?.voted ?? false
                        };
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