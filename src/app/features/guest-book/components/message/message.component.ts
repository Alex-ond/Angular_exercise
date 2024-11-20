import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Message } from '../../models/message';
import { GuestBookState } from '../../store/guest-book.state';
import { selectMessage } from '../../store/guest-book.actions';
import { AuthorInfoDialogComponent } from '../author-info-dialog/author-info-dialog.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {
  @Input({ required: true })
  message!: Message;
  readonly dialog = inject(MatDialog);

  constructor(private store: Store<GuestBookState>) { }

  openAuthorInfoDialog(messageId: string) {
    this.store.dispatch(selectMessage(messageId));
    this.dialog.open(AuthorInfoDialogComponent,
      {
        height: '300px',
        width: '450px'
      });
  }
}
