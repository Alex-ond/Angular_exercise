import { Inject, Injectable } from '@angular/core';
import { map, mergeMap, Observable } from 'rxjs';
import { InjectNames } from '../../../core/inject-names';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Vote } from '../models/vote';

@Injectable({ providedIn: 'root' })
export class RatingService {

    constructor(
        @Inject(InjectNames.PostRatingApiUrl) private url: string,
        private http: HttpClient) { }

    vote(vote: Vote): Observable<{ postId: number, averageRating: number }> {

        const params = new HttpParams({
            fromObject: {
                orderBy: '"postId"',
                equalTo: vote.postId
            }
        });

        return this.http.get<{ [key: string]: Vote }>(this.url, { params: params }).pipe(
            map((response) => {
                return this.convertToVoteMap(response);
            }),
            mergeMap((voteMap) => {
                return this.addVote({ postId: vote.postId, rating: vote.rating }).pipe(
                    map(() => {
                        const ratings = voteMap.get(vote.postId);
                        if (ratings) {
                            ratings.push(vote.rating);
                        }
                        return { postId: vote.postId, averageRating: RatingService.calculateAverageRating(ratings ?? [vote.rating]) };
                    }))
            }));
    }

    fetchRatings() {
        return this.http.get<{ [key: string]: Vote }>(this.url).pipe(
            map((response) => {
                return this.convertToVoteMap(response);
            })
        );
    }

    private convertToVoteMap(response: { [key: string]: Vote }): Map<number, number[]> {
        const map = new Map<number, number[]>();
        if (!response) {
            return map;
        }
        for (const key in response) {
            const vote = response[key];
            if (!map.has(vote.postId)) {
                map.set(vote.postId, [vote.rating]);
            }
            else {
                const ratings = map.get(vote.postId)!;
                ratings.push(vote.rating);
                map.set(vote.postId, ratings);
            }
        }
        return map;
    }

    private addVote(vote: Vote) {
        return this.http.post(this.url, vote);
    }

    static calculateAverageRating(ratings: number[] | undefined) {
        if (!ratings || ratings.length === 0) {
            return 0;
        }
        return Math.round(ratings.reduce((acc, current) => acc + current, 0) / ratings.length);
    }
}