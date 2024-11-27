import { BlogEffects } from './blog.effects';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { PostsService } from '../services/posts.service';
import { RatingService } from '../services/rating.service';
import * as Selectors from './blog.selectors';
import * as Actions from './blog.actions';
import { testCachedPosts, testPostComments, testPosts } from '../blog.test-data.spec';

describe('BlogEffects', () => {    
    let effects: BlogEffects;
    let actions$: Observable<Action>;
    let mockPostsService: jasmine.SpyObj<PostsService>;
    let mockRatingService: jasmine.SpyObj<RatingService>;
    let store: MockStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore({
                    selectors: [
                        {
                            selector: Selectors.postsSelector, value: []
                        }
                    ]
                }),
                BlogEffects,
                provideMockActions(() => actions$),
                { 
                    provide: PostsService, useValue: jasmine.createSpyObj<PostsService>(['fetchPosts', 'fetchPostCommentsByPostId']) 
                },
                { 
                    provide: RatingService, useValue: jasmine.createSpyObj<RatingService>(['vote']) 
                }
            ]
        });
        store = TestBed.inject(MockStore);
        effects = TestBed.inject(BlogEffects);        
        mockPostsService = TestBed.inject(PostsService) as jasmine.SpyObj<PostsService>;
        mockRatingService = TestBed.inject(RatingService) as jasmine.SpyObj<RatingService>;      
    })

    it('fetchPosts$ should return [BLog API] Fetch posts success on success', (done) => {
        mockPostsService.fetchPosts.and.returnValue(of(testPosts));
        actions$ = of(Actions.fetchPosts());

        effects.fetchPosts$.subscribe((action) => {
            expect(action).toEqual(Actions.fetchPostsSuccess({ posts: testPosts }));
            done();
        });
    })

    it('fetchPosts$ should return from store [BLog API] Fetch posts success on success', (done) => {
        mockPostsService.fetchPosts.and.returnValue(of(testPosts));
        actions$ = of(Actions.fetchPosts());
        store.overrideSelector(Selectors.postsSelector, testCachedPosts);

        effects.fetchPosts$.subscribe((action) => {
            expect(action).toEqual(Actions.fetchPostsSuccess({ posts: testCachedPosts }));
            done();
        });
    })

    it('fetchPosts$ should return [BLog API] Fetch posts failure on error', (done) => {
        const errorMessage = 'testError';
        mockPostsService.fetchPosts.and.callFake(() => {
            return throwError(() => new Error(errorMessage));
        });
        actions$ = of(Actions.fetchPosts());

        effects.fetchPosts$.subscribe((action) => {
            expect(action).toEqual(Actions.fetchPostsFailure({ errorMessage }));
            done();
        });
    })

    it('fetchPostComments$ should return [BLog API] Fetch post comments by post id success on success', (done) => {
        mockPostsService.fetchPostCommentsByPostId.and.returnValue(of(testPostComments));
        const postId = 1;
        actions$ = of(Actions.fetchPostCommentsByPostId(postId))

        effects.fetchPostComments$.subscribe((action) => {
            expect(action).toEqual(Actions.fetchPostCommentsByPostIdSuccess({ postComments: testPostComments }));
            done();
        });
    })

    it('fetchPostComments$ should return [BLog API] Fetch post comments by post id failure on error', (done) => {
        const errorMessage = 'testError';
        mockPostsService.fetchPostCommentsByPostId.and.callFake(() => {
            return throwError(() => new Error(errorMessage));
        });
        const postId = 1;
        actions$ = of(Actions.fetchPostCommentsByPostId(postId))

        effects.fetchPostComments$.subscribe((action) => {
            expect(action).toEqual(Actions.fetchPostCommentsByPostIdFailure({ errorMessage }));
            done();
        });
    })

    it('vote$ should return [Blog API] Vote success on success', (done) => {
        const postId = 1;
        const result = { postId: postId, averageRating: 1 };
        mockRatingService.vote.and.returnValue(of(result));
        const rating = 3;
        actions$ = of(Actions.vote(postId, rating))

        effects.vote$.subscribe((action) => {
            expect(action).toEqual(Actions.voteSuccess(result));
            done();
        });
    })

    it('vote$ should return [Blog API] Vote success on success', (done) => {
        const errorMessage = 'testError';
        mockRatingService.vote.and.callFake(() => {
            return throwError(() => new Error(errorMessage));
        });
        const postId = 1;
        const rating = 3;
        actions$ = of(Actions.vote(postId, rating))

        effects.vote$.subscribe((action) => {
            expect(action).toEqual(Actions.voteFailure({errorMessage}));
            done();
        });
    })
});