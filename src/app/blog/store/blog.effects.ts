import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType  } from '@ngrx/effects';
import * as BlogActions from "./blog.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { PostsService } from "../services/posts.service";

@Injectable()
export class BlogEffects {

    constructor(private actions$: Actions, private postsService: PostsService) {}      

    fetchPosts$ = createEffect(() => 
        this.actions$.pipe(
            ofType(BlogActions.fetchPosts),
            switchMap(() => 
                this.postsService.fetchPosts().pipe(
                    map(posts => BlogActions.fetchPostsSuccess({posts})),
                    catchError((error: Error) => of(BlogActions.fetchPostsFailure({errorMessage: error.message}))
                    )))));
    
    fetchPostComments$ = createEffect(() => 
        this.actions$.pipe(
            ofType(BlogActions.fetchPostCommentsByPostId),
            switchMap(action => 
                this.postsService.fetchPostCommentsByPostId(action.postId).pipe(
                    map(comments => BlogActions.fetchPostCommentsByPostIdSuccess({comments})),
                    catchError((error: Error) => of(BlogActions.fetchPostCommentsByPostIdFailure({errorMessage: error.message}))
                    )))));
}