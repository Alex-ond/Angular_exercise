import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-guest-book',
  templateUrl: './guest-book.component.html',
  styleUrl: './guest-book.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestBookComponent {
}
