import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InjectNames } from '../../../core/inject-names';
import { RatingService } from './rating.service';
import { LocalStorageService } from './local-storage.service';
import { testApiRatings, testRatingMap, testCreatedVoteResult, testVotedPostIds, testUpdatedVoteResult } from '../blog.test-data.spec';

describe('RatingService', () => {
    let ratingService: RatingService;
    let httpTestingController: HttpTestingController;
    let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

    beforeEach(() => {
        TestBed.configureTestingModule(
            {
                imports: [
                    HttpClientTestingModule
                ],
                providers: [
                    {
                        provide: InjectNames.PostRatingApiUrl, useValue: 'postRatingUrl'
                    },
                    {
                        provide: LocalStorageService, useValue:
                            jasmine.createSpyObj<LocalStorageService>(['getVotedPostIds', 'addVotedPostId'])
                    },
                ]
            });

        localStorageServiceSpy = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
        localStorageServiceSpy.getVotedPostIds.and.returnValue(testVotedPostIds);

        httpTestingController = TestBed.inject(HttpTestingController);
        ratingService = TestBed.inject(RatingService);
    })

    it('should fetch rating map', (done) => {
        ratingService.fetchRatingMap().subscribe(
            (result) => {
                expect(result).toEqual(testRatingMap);
                done();
            });

        const getRequest = httpTestingController.expectOne('postRatingUrl');
        expect(getRequest.request.method).toBe('GET');
        getRequest.flush(testApiRatings, { status: 200, statusText: 'OK' });
    })

    it('should create post rating', (done) => {
        const postId = 3;
        const rating = 4;
        ratingService.vote(postId, rating).subscribe(
            (result) => {
                expect(result).toEqual(testCreatedVoteResult);
                done();
            });

        const getRequest = httpTestingController.expectOne('postRatingUrl?orderBy=%22postId%22&equalTo=3');
        expect(getRequest.request.method).toBe('GET');
        getRequest.flush(null, { status: 200, statusText: 'OK' });

        const postRequest = httpTestingController.expectOne('postRatingUrl');
        expect(postRequest.request.method).toBe('POST');
        postRequest.flush(null, { status: 201, statusText: 'OK' });
    })

    it('should update post rating', (done) => {
        const postId = 1;
        const rating = 4;
        ratingService.vote(postId, rating).subscribe(
            (result) => {
                expect(result).toEqual(testUpdatedVoteResult);
                done();
            });

        const getRequest = httpTestingController.expectOne('postRatingUrl?orderBy=%22postId%22&equalTo=1');
        expect(getRequest.request.method).toBe('GET');
        getRequest.flush(testApiRatings, { status: 200, statusText: 'OK' });

        const patchRequest = httpTestingController.expectOne('postRatingUrl');
        expect(patchRequest.request.method).toBe('PATCH');
        patchRequest.flush({ name: '3' }, { status: 201, statusText: 'OK' });
    })
})