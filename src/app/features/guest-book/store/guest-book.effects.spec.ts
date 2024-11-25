import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as Actions from './guest-book.actions';
import { GuestBookEffects } from './guest-book.effects';
import { GuestBookService } from '../services/guest-book.service';
import { testMessages, testNewMessage } from '../guest-book.test-data.spec';

describe('GuestBookEffects', () => {
    let effects: GuestBookEffects;
    let actions$: Observable<Action>;
    let mockGuestBookService: jasmine.SpyObj<GuestBookService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore({}),
                GuestBookEffects,
                provideMockActions(() => actions$),
                { 
                    provide: GuestBookService, 
                    useValue: jasmine.createSpyObj<GuestBookService>(['fetchMessages', 'addMessage']) 
                }
            ]
        });
        effects = TestBed.inject(GuestBookEffects);
        mockGuestBookService = TestBed.inject(GuestBookService) as jasmine.SpyObj<GuestBookService>;
    })

    it('fetchMessages$ should return [Guest book API] Fetch messages success on success', (done) => {
        mockGuestBookService.fetchMessages.and.returnValue(of(testMessages));
        actions$ = of(Actions.fetchMessages())

        effects.fetchMessages$.subscribe((action) => {
            expect(action).toEqual(Actions.fetchMessagesSuccess({ messages: testMessages }));
            done();
        });
    })

    it('fetchMessages$ should return [Guest book API] Fetch messages failure on error', (done) => {
        const errorMessage = 'testError';
        mockGuestBookService.fetchMessages.and.callFake(() => {
            return throwError(() => new Error(errorMessage));
        });
        actions$ = of(Actions.fetchMessages());

        effects.fetchMessages$.subscribe((action) => {
            expect(action).toEqual(Actions.fetchMessagesFailure({ errorMessage }));
            done();
        });
    })

    it('addMessage$ should return [Guest book API] Add message success on success', (done) => {
        mockGuestBookService.addMessage.and.returnValue(of({ ...testNewMessage, id: '3' }));
        actions$ = of(Actions.addMessage(testNewMessage))

        effects.addMessage$.subscribe((action) => {
            expect(action).toEqual(Actions.addMessageSuccess({ message: { ...testNewMessage, id: '3' } }));
            done();
        });
    })

    it('addMessage$ should return [Guest book API] Add message failure on error', (done) => {
        const errorMessage = 'testError';
        mockGuestBookService.addMessage.and.callFake(() => {
            return throwError(() => new Error(errorMessage));
        });
        actions$ = of(Actions.addMessage(testNewMessage))

        effects.addMessage$.subscribe((action) => {
            expect(action).toEqual(Actions.addMessageFailure({ errorMessage }));
            done();
        });
    })
});