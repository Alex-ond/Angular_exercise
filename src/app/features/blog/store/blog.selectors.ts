import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlogState } from './blog.state';
import { FeatureNames } from '../../../core/feature-names';

const getFeatureState = createFeatureSelector<BlogState>(FeatureNames.Blog);

export const postsSelector = createSelector(
  getFeatureState,
  state => state.posts
)

export const isPostsLoadingSelector = createSelector(
  getFeatureState,
  state => state.isPostsLoading
)

export const postsFetchingErrorMessageSelector = createSelector(
  getFeatureState,
  state => state.postsFetchingErrorMessage
)

export const postCommentsSelector = createSelector(
  getFeatureState,
  state => state.postComments
)

export const isPostCommentsLoadingSelector = createSelector(
  getFeatureState,
  state => state.isPostCommentsLoading
)

export const postCommentsFetchingErrorMessageSelector = createSelector(
  getFeatureState,
  state => state.postCommentsFetchingErrorMessage
)    