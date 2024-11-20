import { Inject, Injectable } from '@angular/core';
import { map, mergeMap, Observable, tap } from 'rxjs';
import { InjectNames } from '../../../core/inject-names';
import { HttpClient, HttpParams } from '@angular/common/http';

type PostRatings = {
    [key: string]: PostRating
}

type PostRating = {
    postId: number,
    ratingSum: number,
    voteNumber: number
}

const votedPostIdsKey = 'votedPostIds';

@Injectable({ providedIn: 'root' })
export class RatingService {

    constructor(
        @Inject(InjectNames.PostRatingApiUrl) private url: string,
        private http: HttpClient) { }

    vote(postId: number, rating: number): Observable<{ postId: number, averageRating: number }> {

        const params = new HttpParams({
            fromObject: {
                orderBy: '"postId"',
                equalTo: postId
            }
        });

        return this.http.get<PostRatings>(this.url, { params: params }).pipe(
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
                    const {savedItemName, savedPostRating} = savedPostRatingData;
                    const postRating: PostRating =
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
                    const postRating: PostRating =
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
            tap(result => {
                this.addVotedPostIdToLocalStorage(result.postId);
            }));
    }

    fetchRatingMap(): Observable<Map<number, { averageRating: number, voted: boolean }>> {
        return this.http.get<PostRatings>(this.url).pipe(
            map(response => {
                return this.createRatingsMap(response);
            })
        );
    }

    private createRatingsMap(postRatings: PostRatings)
        : Map<number, { averageRating: number, voted: boolean }> {

        const map = new Map<number, { averageRating: number, voted: boolean }>();
        if (!postRatings) {
            return map;
        }
        const votedPostIds = this.getVotedPostIdsFromLocalStorage();
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

    private addPostRating(postRating: PostRating) {
        return this.http.post(this.url, postRating);
    }

    private updatePostRating(name: string, postRating: PostRating) {
        const postRatings: PostRatings = {};
        postRatings[name] = postRating;
        return this.http.patch(this.url, postRatings);
    }

    private addVotedPostIdToLocalStorage(postId: number) {
        let votedPostIds: number[] = this.getVotedPostIdsFromLocalStorage()
        votedPostIds.push(postId);
        localStorage.setItem(votedPostIdsKey, JSON.stringify(votedPostIds));
    }

    private getVotedPostIdsFromLocalStorage(): number[] {
        const votedPostIdsValue = localStorage.getItem(votedPostIdsKey);
        return votedPostIdsValue ? JSON.parse(votedPostIdsValue) : [];
    }

    private static calculateAverageRating(postRating: PostRating): number {
        return postRating ? Math.round(postRating.ratingSum / postRating.voteNumber) : 0;
    }
}