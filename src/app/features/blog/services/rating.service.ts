import { Inject, Injectable } from '@angular/core';
import { map, mergeMap, Observable, tap } from 'rxjs';
import { InjectNames } from '../../../core/inject-names';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

export type ApiPostRatings = {
    [key: string]: ApiPostRating
}

export type ApiPostRating = {
    postId: number,
    ratingSum: number,
    voteNumber: number
}

export type PostRating = {
    averageRating: number,
    voted: boolean
}

@Injectable({ providedIn: 'root' })
export class RatingService {

    constructor(
        @Inject(InjectNames.PostRatingApiUrl) private url: string,
        private http: HttpClient,
        private localStorageService: LocalStorageService) { }

    vote(postId: number, rating: number): Observable<{ postId: number, averageRating: number }> {

        const params = new HttpParams({
            fromObject: {
                orderBy: '"postId"',
                equalTo: postId
            }
        });

        return this.http.get<ApiPostRatings>(this.url, { params: params }).pipe(
            map(response => {
                if (!response) {
                    return null
                }
                for (const key in response) {
                    return {
                        savedItemName: key,
                        savedPostRating: response[key]
                    };
                }
                return null;
            }),
            mergeMap(savedPostRatingData => {
                if (savedPostRatingData) {
                    const { savedItemName, savedPostRating } = savedPostRatingData;
                    const postRating: ApiPostRating =
                    {
                        postId: savedPostRating.postId,
                        ratingSum: savedPostRating.ratingSum + rating,
                        voteNumber: savedPostRating.voteNumber + 1
                    };
                    return this.updatePostRating(savedItemName, postRating).pipe(map(() => {
                        return {
                            postId: postRating.postId,
                            averageRating: RatingService.calculateAverageRating(postRating)
                        };
                    }));
                }
                else {
                    const postRating: ApiPostRating =
                    {
                        postId: postId,
                        ratingSum: rating,
                        voteNumber: 1
                    };
                    return this.addPostRating(postRating).pipe(map(() => {
                        return {
                            postId: postRating.postId,
                            averageRating: RatingService.calculateAverageRating(postRating)
                        };
                    }));
                }
            }),
            tap(({ postId }) => {
                this.localStorageService.addVotedPostId(postId);
            }));
    }

    fetchRatingMap(): Observable<Map<number, PostRating>> {
        return this.http.get<ApiPostRatings>(this.url).pipe(
            map(response => {
                return this.createRatingsMap(response);
            })
        );
    }

    private createRatingsMap(postRatings: ApiPostRatings)
        : Map<number, PostRating> {

        const map = new Map<number, PostRating>();
        if (!postRatings) {
            return map;
        }
        const votedPostIds = this.localStorageService.getVotedPostIds();
        for (const key in postRatings) {
            const postRating = postRatings[key];
            map.set(
                postRating.postId,
                {
                    averageRating: RatingService.calculateAverageRating(postRating),
                    voted: votedPostIds.indexOf(postRating.postId) > -1
                });
        }
        return map;
    }

    private addPostRating(postRating: ApiPostRating) {
        return this.http.post(this.url, postRating);
    }

    private updatePostRating(name: string, postRating: ApiPostRating) {
        const postRatings: ApiPostRatings = {};
        postRatings[name] = postRating;
        return this.http.patch(this.url, postRatings);
    }

    private static calculateAverageRating(postRating: ApiPostRating): number {
        return postRating ? Math.round(postRating.ratingSum / postRating.voteNumber) : 0;
    }
}