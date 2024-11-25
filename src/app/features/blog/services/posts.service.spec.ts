import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostsService } from "./posts.service";
import { InjectNames } from "../../../core/inject-names";
import { UsersService } from "./users.service";
import { RatingService } from "./rating.service";
import { of } from "rxjs";
import { omit } from "lodash";
import { testPostComments, testPosts, testRatingMap, testUsers } from "../blog.test-data.spec";

const apiPosts = testPosts.map((post) => omit(post, ['username', 'rating', 'voted']));

describe('PostsService', () => {

    let postsService: PostsService;
    let httpTestingController: HttpTestingController;
    let userServiceSpy: jasmine.SpyObj<UsersService>;
    let ratingServiceSpy: jasmine.SpyObj<RatingService>;

    beforeEach(() => {
        TestBed.configureTestingModule(
            {
                imports: [
                    HttpClientTestingModule
                ],
                providers: [
                    { provide: InjectNames.BlogBaseApiUrl, useValue: 'testBlog' },
                    { provide: InjectNames.PostRatingApiUrl, useValue: 'testRating' },
                    { provide: UsersService, useValue: jasmine.createSpyObj<UsersService>(['fetchUsers']) },
                    { provide: RatingService, useValue: jasmine.createSpyObj<RatingService>(['fetchRatingMap']) }
                ]
            })

        userServiceSpy = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
        userServiceSpy.fetchUsers.and.returnValue(of(testUsers));

        ratingServiceSpy = TestBed.inject(RatingService) as jasmine.SpyObj<RatingService>;
        ratingServiceSpy.fetchRatingMap.and.returnValue(of(testRatingMap));

        httpTestingController = TestBed.inject(HttpTestingController);
        postsService = TestBed.inject(PostsService);
    });

    it('should fetch posts', done => {
        postsService.fetchPosts().subscribe(
            result => {
                expect(result).toEqual(testPosts);
                done();
            });

        const getRequest = httpTestingController.expectOne("testBlog/posts");
        expect(getRequest.request.method).toBe("GET");
        getRequest.flush(apiPosts, { status: 200, statusText: "OK" });
    });

    it('should fetch post commments by post id', done => {
        postsService.fetchPostCommentsByPostId(1).subscribe(
            result => {
                expect(result).toEqual(testPostComments);
                done();
            });

        const getRequest = httpTestingController.expectOne("testBlog/posts/1/comments");
        expect(getRequest.request.method).toBe("GET");
        getRequest.flush(testPostComments, { status: 200, statusText: "OK" });
    });
})