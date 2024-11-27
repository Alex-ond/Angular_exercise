import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GuestBookState } from '../../store/guest-book.state';
import { addMessage } from '../../store/guest-book.actions';
import * as Selectors from '../../store/guest-book.selectors'
import { clearErrors } from '../../../../shared/form-utils';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrl: './add-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMessageComponent {
  errorMessage$ = this.store.select(Selectors.messageAddingErrorMessage);
  form = this.formBuilder.group({
    name: this.formBuilder.control('', Validators.required),
    email: this.formBuilder.control('', Validators.email),
    message: this.formBuilder.control('', [Validators.required, Validators.minLength(20)])
  });

  constructor(private store: Store<GuestBookState>, private formBuilder: FormBuilder) { }

  onSubmit() {
    this.formBuilder.control
    const message = this.getMessage();
    this.store.dispatch(addMessage(message));
    this.form.reset();    
    clearErrors(this.form);
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
