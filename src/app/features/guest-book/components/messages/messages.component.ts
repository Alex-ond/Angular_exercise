import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Selectors from '../../store/guest-book.selectors'
import { GuestBookState } from '../../store/guest-book.state';
import { fetchMessages } from '../../store/guest-book.actions';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
  messages$ = this.store.select(Selectors.messagesSelector);
  isLoading$ = this.store.select(Selectors.isMessagesLoadingSelector);
  errorMessage$ = this.store.select(Selectors.messagesFetchingErrorMessageSelector);

  constructor(private store: Store<GuestBookState>) {
    this.store.dispatch(fetchMessages());
  }
}
