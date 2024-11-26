import { Injectable } from '@angular/core';

const votedPostIdsKey = 'votedPostIds';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    
    addVotedPostId(postId: number) {
        let votedPostIds: number[] = this.getVotedPostIds()
        votedPostIds.push(postId);
        localStorage.setItem(votedPostIdsKey, JSON.stringify(votedPostIds));
    }

    getVotedPostIds(): number[] {
        const votedPostIdsValue = localStorage.getItem(votedPostIdsKey);
        return votedPostIdsValue ? JSON.parse(votedPostIdsValue) : [];
    }
}