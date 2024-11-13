import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorInfoDialogComponent } from './author-info-dialog/author-info-dialog.component';
import { Store } from '@ngrx/store';
import { GuestBookState } from '../../../store/guest-book.state';
import { Message } from '../../../models/message';
import { fetchMessageAuthor } from '../../../store/guest-book.actions';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Input({required: true})
  message!: Message;
  readonly dialog = inject(MatDialog);

  constructor(private store: Store<GuestBookState>) {}

  openAuthorInfoDialog(messageId: number) {    
    this.store.dispatch(fetchMessageAuthor(messageId));
    this.dialog.open(AuthorInfoDialogComponent, 
      {
        height: '300px', 
        width: '450px'
      });
  }
}
