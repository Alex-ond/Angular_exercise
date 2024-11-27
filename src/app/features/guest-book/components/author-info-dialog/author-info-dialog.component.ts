import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Selectors from '../../store/guest-book.selectors';
import { GuestBookState } from '../../store/guest-book.state';

@Component({
  selector: 'app-author-info-dialog',
  templateUrl: './author-info-dialog.component.html',
  styleUrl: './author-info-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorInfoDialogComponent {
  author$ = this.store.select(Selectors.selectedMessageAuthorSelector);

  constructor(private store: Store<GuestBookState>) { }
}