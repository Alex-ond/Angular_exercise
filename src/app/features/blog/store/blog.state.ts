import { PostComment } from "../models/post-comment";
import { Post } from "../models/post";
import { AppState } from "../../../core/store/app.state";

export interface BlogState extends AppState{
    posts: Post[],
    isPostsLoading: boolean,
    postsFetchingErrorMessage: string

    postComments: PostComment[],    
    isPostCommentsLoading: boolean,
    postCommentsFetchingErrorMessage: string
}

export const initialState: BlogState = {    
    posts: [],
    isPostsLoading: false,    
    postsFetchingErrorMessage: '',

    postComments: [],
    isPostCommentsLoading: false,
    postCommentsFetchingErrorMessage: ''
}
