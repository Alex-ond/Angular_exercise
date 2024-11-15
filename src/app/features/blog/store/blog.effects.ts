import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType  } from '@ngrx/effects';
import * as BlogActions from "./blog.actions";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { PostsService } from "../services/posts.service";
import { Store } from "@ngrx/store";
import { postsSelector } from "./blog.selectors";

@Injectable()
export class BlogEffects {

    constructor(private actions$: Actions, private store: Store, private postsService: PostsService) {}      

    fetchPosts$ = createEffect(() => 
        this.actions$.pipe(
            ofType(BlogActions.fetchPosts),
            withLatestFrom(this.store.select(postsSelector)),
            switchMap(([_, storedPosts]) => 
            {
                if (storedPosts.length > 0) {
                    return of(BlogActions.fetchPostsSuccess({posts: storedPosts}));
                }
                return this.postsService.fetchPosts().pipe(
                    map(posts => BlogActions.fetchPostsSuccess({posts})),
                    catchError((error: Error) => of(BlogActions.fetchPostsFailure({errorMessage: error.message}))))
            })));
                
    fetchPostComments$ = createEffect(() => 
        this.actions$.pipe(
            ofType(BlogActions.fetchPostCommentsByPostId),
            switchMap(action => 
                this.postsService.fetchPostCommentsByPostId(action.postId).pipe(
                    map(comments => BlogActions.fetchPostCommentsByPostIdSuccess({comments})),
                    catchError((error: Error) => of(BlogActions.fetchPostCommentsByPostIdFailure({errorMessage: error.message}))
                    )))));
}