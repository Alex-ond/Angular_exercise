import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GuestBookState } from "./guest-book.state";
import { FeatureNames } from "../../../core/feature-names";

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

export const selectedMessageAuthorSelector = createSelector(
  getFeatureState,
    state => {
      if (!state.selectedMessageId) {
        return null;
      }
      return state.messages.find(message => message.id === state.selectedMessageId)?.author;
    }
)    