import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GuestBookState } from '../../store/guest-book.state';
import { addMessage } from '../../store/guest-book.actions';
import * as Selectors from '../../store/guest-book.selectors'

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrl: './add-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMessageComponent {
  errorMessage$ = this.store.select(Selectors.messageAddingErrorMessage);  
  form  = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    message: new FormControl('', [Validators.required, Validators.minLength(20)])
  });

  constructor(private store: Store<GuestBookState>) {}

  onSubmit() {
    const message = this.getMessage();
    this.store.dispatch(addMessage(message));
    this.form.reset();  
  }

  private getMessage() {
    var rawValue = this.form.getRawValue();
    return { 
      id: '',
      message: rawValue.message!,
      author: {
        name: rawValue.name!,
        email: rawValue.email
      }      
    };
  }
}
