import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GuestBookEffects } from './store/guest-book.effects';
import { guestBookReducer } from './store/guest-book.reducer';
import { MatDialogModule } from '@angular/material/dialog';
import { GuestBookComponent } from './components/guest-book/guest-book.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageComponent } from './components/message/message.component';
import { AddMessageComponent } from './components/add-message/add-message.component';
import { AuthorInfoDialogComponent } from './components/author-info-dialog/author-info-dialog.component';
import { FeatureNames } from '../../core/feature-names';
import { SharedModule } from '../../shared/shared.module';
import { InjectNames } from '../../core/inject-names';
import { environment } from '../../core/environments/environment';

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
    HttpClientModule,
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
export class GuestBookModule { }
