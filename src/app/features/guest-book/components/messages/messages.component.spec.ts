import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesComponent } from './messages.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { Message } from '../../models/message';
import * as Selectors from '../../store/guest-book.selectors';
import { createSingleCold, queryByDirective } from '../../../../core/test-utils.spec';
import { ErrorComponent } from '../../../../shared/components/error/error.component';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '../../../../shared/shared.module';
import { testMessages } from '../../guest-book.test-data.spec';

describe('MessagesComponent', () => {
    let component: MessagesComponent;
    let fixture: ComponentFixture<MessagesComponent>;

    let store: MockStore;

    let mockMessagesFetchingErrorMessageSelector: MemoizedSelector<object, string>;
    let mockIsMessagesLoadingSelector: MemoizedSelector<object, boolean>;
    let mockMessagesSelector: MemoizedSelector<object, Message[]>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                MessagesComponent,
                ErrorComponent
            ],
            providers: [
                provideMockStore({})
            ],
            imports: [
                SharedModule,
                MatProgressBarModule
            ]
        })
            .compileComponents();

        store = TestBed.inject(MockStore);
        mockMessagesFetchingErrorMessageSelector =
            store.overrideSelector(Selectors.messagesFetchingErrorMessageSelector, '');
        mockIsMessagesLoadingSelector = store.overrideSelector(Selectors.isMessagesLoadingSelector, false);
        mockMessagesSelector = store.overrideSelector(Selectors.messagesSelector, []);

        fixture = TestBed.createComponent(MessagesComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update errorMessage$ when selector data changes', () => {
        mockMessagesFetchingErrorMessageSelector.setResult('testError');

        expect(component.errorMessage$).toBeObservable(createSingleCold('testError'));
    });

    it('should update isLoading$ when selector data changes', () => {
        mockIsMessagesLoadingSelector.setResult(true);

        expect(component.isLoading$).toBeObservable(createSingleCold(true));
    });

    it('should update posts$ when selector data changes', () => {
        mockMessagesSelector.setResult(testMessages);
        
        expect(component.messages$).toBeObservable(createSingleCold(testMessages));
    });

    it('should show error component when errorMessage$ is not empty', () => {
        mockMessagesFetchingErrorMessageSelector.setResult('testError');
        fixture.detectChanges();

        expect(queryByDirective(fixture, ErrorComponent)).not.toBeNull()
    });

    it('should show progress bar component when isLoading$ is true', () => {
        mockIsMessagesLoadingSelector.setResult(true);
        fixture.detectChanges();

        expect(queryByDirective(fixture, MatProgressBar)).not.toBeNull()
    });
});
