import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '../shared/shared.module';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FeatureNames } from '../shared/feature-names';
import { GuestBookEffects } from './store/guest-book.effects';
import { guestBookReducer } from './store/guest-book.reducer';
import { MatDialogModule} from '@angular/material/dialog';
import { GuestBookComponent } from './guest-book/guest-book.component';
import { MessagesComponent } from './guest-book/messages/messages.component';
import { MessageComponent } from './guest-book/messages/message/message.component';
import { AddMessageComponent } from './guest-book/add-message/add-message.component';
import { AuthorInfoDialogComponent } from './guest-book/messages/message/author-info-dialog/author-info-dialog.component';
import { InjectNames } from '../shared/inject-names';
import { environment } from '../core/environments/environment';

@NgModule({
  declarations: [
    GuestBookComponent,
    MessagesComponent,
    MessageComponent,
    AddMessageComponent,
    AuthorInfoDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forFeature(FeatureNames.GuestBook, guestBookReducer),
    EffectsModule.forFeature([GuestBookEffects]),
    SharedModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatButton,
    MatTooltip,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
],
  providers: [    
    {
      provide: InjectNames.GuestBookApiUrl, useValue: environment.guestBookApiUrl
    }
  ]
})
export class GuestBookModule {}
