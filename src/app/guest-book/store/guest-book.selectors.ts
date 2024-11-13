import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeatureNames } from "../../shared/feature-names";
import { GuestBookState } from "./guest-book.state";

const getFeatureState = createFeatureSelector<GuestBookState>(FeatureNames.GuestBook);

export const messagesSelector = createSelector(
  getFeatureState,
  state => state.messages
)

export const isMessagesLoadingSelector = createSelector(
  getFeatureState,
  state => state.isMessagesLoading
) 

export const messagesFetchingErrorMessageSelector = createSelector(
  getFeatureState,
  state => state.messagesFetchingErrorMessage
)    
   
export const messageAddingErrorMessage = createSelector(
  getFeatureState,
    state => state.messageAddingErrorMessage
)    

export const messageAuthorSelector = createSelector(
  getFeatureState,
    state => state.messageAuthor
)    

export const messageAuthorFetchingErrorMessageSelector = createSelector(
  getFeatureState,
    state => state.messageAuthorFetchingErrorMessage
)    