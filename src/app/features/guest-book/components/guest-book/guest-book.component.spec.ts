import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestBookComponent } from './guest-book.component';
import { MessagesComponent } from '../messages/messages.component';
import { provideMockStore } from '@ngrx/store/testing';
import { AddMessageComponent } from '../add-message/add-message.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ErrorComponent } from '../../../../shared/components/error/error.component';
import { MessageComponent } from '../message/message.component';

describe('GuestBookComponent', () => {
    let component: GuestBookComponent;
    let fixture: ComponentFixture<GuestBookComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                GuestBookComponent,
                MessagesComponent,
                AddMessageComponent,
                ErrorComponent,
                MessageComponent
            ],
            providers: [
                provideMockStore({})
            ],
            imports: [
                MatCardModule,
                MatProgressBarModule,
                MatInputModule,
                ReactiveFormsModule,
                BrowserAnimationsModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(GuestBookComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
