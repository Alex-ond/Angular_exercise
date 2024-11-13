import { AppState } from "../../store/app.state";
import { PostComment } from "../models/post-comment";
import { Post } from "../models/post";

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
