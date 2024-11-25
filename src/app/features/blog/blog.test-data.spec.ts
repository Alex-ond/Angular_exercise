import { Post } from "./models/post";
import { PostComment } from "./models/post-comment";
import { User } from "./models/user";
import { ApiPostRatings, PostRating } from "./services/rating.service";
import { BlogState } from "./store/blog.state";

export const testPosts: Post[] = [
    {
        id: 1,
        title: 'title1',
        body: 'body1',
        rating: 2,
        userId: 1,
        voted: true,
        username: 'Alex'
    },
    {
        id: 2,
        title: 'title2',
        body: 'body2',
        rating: 3,
        userId: 2,
        voted: false,
        username: 'Anna'
    }
]
export const testRatingMap: Map<number, PostRating> = new Map(
    [
        [
            1,
            {
                averageRating: 2,
                voted: true
            }
        ],
        [
            2,
            {
                averageRating: 3,
                voted: false
            }
        ]
    ])

export const testVotedPostIds: number[] = [1]

export const testApiRatings: ApiPostRatings = {
    'a': {
        postId: 1,
        ratingSum: 2,
        voteNumber: 1
    },
    'b': {
        postId: 2,
        ratingSum: 6,
        voteNumber: 2
    }
}

export const testPost: Post = {
    id: 1,
    title: 'title',
    body: 'body',
    userId: 1,
    username: 'Alex',
    rating: 2,
    voted: false
}

export const testUsers: User[] = [
    {
        id: 1,
        username: 'Alex'
    },
    {
        id: 2,
        username: 'Anna'
    }
]

export const testPostComment: PostComment = {
    id: 1,
    postId: 1,
    name: 'name',
    body: 'body',
    email: 'email',
}

export const testPostComments: PostComment[] = [
    {
        id: 1,
        postId: 1,
        body: 'Comment1',
        name: 'Name1',
        email: 'Email1'
    },
    {
        id: 2,
        postId: 2,
        body: 'Comment2',
        name: 'Name2',
        email: 'Email2'
    }
]

export const testCreatedVoteResult: { postId: number, averageRating: number } = {
    postId: 3,
    averageRating: 4
}

export const testUpdatedVoteResult: { postId: number, averageRating: number } = {
    postId: 1,
    averageRating: 3
}

export const testState: BlogState = {
    isPostCommentsLoading: true,
    isPostsLoading: true,
    postComments: [
        {
            id: 1,
            postId: 1,
            name: 'name',
            body: 'body',
            email: 'email'
        }
    ],
    postCommentsFetchingErrorMessage: 'postCommentsFetchingErrorMessage',
    posts: [
        {
            id: 1,
            userId: 1,
            title: 'title',
            body: 'body',
            rating: 1,
            voted: true,
            username: 'Alex'
        }
    ],
    postsFetchingErrorMessage: 'postsFetchingErrorMessage',
    voteErrorMessage: 'voteErrorMessage'
}
