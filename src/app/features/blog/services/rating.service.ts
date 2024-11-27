import { Inject, Injectable } from '@angular/core';
import { concatMap, map, Observable, tap } from 'rxjs';
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

    fetchRatingMap(): Observable<Map<number, PostRating>> {
        return this.http.get<ApiPostRatings>(this.url).pipe(
            map(response => {
                return this.createRatingsMap(response);
            })
        );
    }

    vote(postId: number, rating: number): Observable<{ postId: number, averageRating: number }> {
        return this.http.get<ApiPostRatings>(this.url, {
            params: new HttpParams({
                fromObject: {
                    orderBy: '"postId"',
                    equalTo: postId
                }
            })
        }).pipe(
            map(response => {
                if (!response) {
                    return null;
                }
                for (const key in response) {
                    return {
                        name: key,
                        postRating: response[key]
                    };
                }
                return null;
            }),
            concatMap(existingPostRating => {
                return (existingPostRating ?
                    this.update(existingPostRating.name, rating, existingPostRating.postRating) :
                    this.create(postId, rating)).pipe(
                        tap(({ postId }) => {
                            this.localStorageService.addVotedPostId(postId);
                        })
                    );
            })
        );
    }

    private create(postId: number, rating: number):
        Observable<{ postId: number, averageRating: number }> {

        const postRating: ApiPostRating =
        {
            postId: postId,
            ratingSum: rating,
            voteNumber: 1
        };
        return this.http.post(this.url, postRating).pipe(
            map(() => {
                return {
                    postId: postId,
                    averageRating: rating
                };
            })
        );
    }

    private update(name: string, rating: number, existingPostRating: ApiPostRating):
        Observable<{ postId: number, averageRating: number }> {

        const postRatings: ApiPostRatings = {};
        const postRating: ApiPostRating =
        {
            postId: existingPostRating.postId,
            ratingSum: existingPostRating.ratingSum + rating,
            voteNumber: existingPostRating.voteNumber + 1
        };
        postRatings[name] = postRating;

        return this.http.patch(this.url, postRatings).pipe(
            map(() => {
                return {
                    postId: postRating.postId,
                    averageRating: RatingService.calculateAverageRating(postRating)
                };
            })
        );
    }

    private createRatingsMap(postRatings: ApiPostRatings): Map<number, PostRating> {

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

    private static calculateAverageRating(postRating: ApiPostRating): number {
        return postRating ? Math.round(postRating.ratingSum / postRating.voteNumber) : 0;
    }
}