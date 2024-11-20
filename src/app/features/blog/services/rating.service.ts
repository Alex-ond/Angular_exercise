import { Inject, Injectable } from '@angular/core';
import { map, mergeMap, Observable, tap } from 'rxjs';
import { InjectNames } from '../../../core/inject-names';
import { HttpClient, HttpParams } from '@angular/common/http';

type apiVotes = {
    [key: string]: apiVote
}

type apiVote = {
    postId: number,
    ratingSum: number,
    voteCount: number
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

        return this.http.get<apiVotes>(this.url, { params: params }).pipe(
            map(response => {
                if (!response) {
                    return null
                }
                for (const key in response) {
                    return { name: key, apiVote: response[key] };
                }
                return null;
            }),
            mergeMap(getResult => {
                if (getResult) {
                    const apiVote: apiVote =
                    {
                        postId: getResult.apiVote.postId,
                        ratingSum: getResult.apiVote.ratingSum + rating,
                        voteCount: getResult.apiVote.voteCount + 1
                    };
                    return this.updateVote(getResult.name, apiVote).pipe(map(() => {
                        return { postId: apiVote.postId, averageRating: RatingService.calculateAverageRating(apiVote) }
                    }));
                }
                else {
                    const apiVote: apiVote =
                    {
                        postId: postId,
                        ratingSum: rating,
                        voteCount: 1
                    };
                    return this.addVote(apiVote).pipe(map(() => {
                        return { postId: apiVote.postId, averageRating: RatingService.calculateAverageRating(apiVote) }
                    }));
                }
            }),
            tap(result => {
                this.addVotedPostIdToLocalStorage(result.postId);
            }));
    }

    fetchRatingMap(): Observable<Map<number, { averageRating: number, voted: boolean }>> {
        return this.http.get<apiVotes>(this.url).pipe(
            map(response => {
                const map = new Map<number, { averageRating: number, voted: boolean }>();
                if (!response) {
                    return map;
                }
                const votedPostIds = this.getVotedPostIds();
                for (const key in response) {
                    const apiVote = response[key];
                    map.set(
                        apiVote.postId,
                        {
                            averageRating: RatingService.calculateAverageRating(apiVote),
                            voted: votedPostIds.indexOf(apiVote.postId) > -1
                        });
                }
                return map;
            })
        );
    }

    private updateVote(name: string, apiVote: apiVote) {
        const apiVotes: apiVotes = {};
        apiVotes[name] = apiVote;
        return this.http.patch(this.url, apiVotes);
    }

    private addVote(apiVote: apiVote) {
        return this.http.post(this.url, apiVote);
    }

    private addVotedPostIdToLocalStorage(postId: number) {
        let votedPostIds: number[] = this.getVotedPostIds()
        votedPostIds.push(postId);
        localStorage.setItem(votedPostIdsKey, JSON.stringify(votedPostIds));
    }

    private getVotedPostIds(): number[] {
        const votedPostIdssValue = localStorage.getItem(votedPostIdsKey);
        return votedPostIdssValue ? JSON.parse(votedPostIdssValue) : [];
    }

    private static calculateAverageRating(apiVote: apiVote): number {
        return apiVote ? Math.round(apiVote.ratingSum / apiVote.voteCount) : 0;
    }
}