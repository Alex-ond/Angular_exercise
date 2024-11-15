import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType  } from '@ngrx/effects';
import * as GuestBookActions from "./guest-book.actions";
import { catchError, concatMap, map, of, switchMap } from "rxjs";
import { GuestBookService } from "../services/guest-book.service";

@Injectable()
export class GuestBookEffects {

    constructor(private actions$: Actions, private guestBookService: GuestBookService) {}      

    fetchMessages$ = createEffect(() => 
        this.actions$.pipe(
            ofType(GuestBookActions.fetchMessages),
            switchMap(() => 
                this.guestBookService.fetchMessages().pipe(
                    map(messages => GuestBookActions.fetchMessagesSuccess({messages})),
                    catchError((error: Error) => of(GuestBookActions.fetchMessagesFailure({errorMessage: error.message}))
                    )))));
    
    addMessage$ = createEffect(() => 
        this.actions$.pipe(
            ofType(GuestBookActions.addMessage),
            concatMap(action => 
                this.guestBookService.addMessage(action.message).pipe(
                    map(message => GuestBookActions.addMessageSuccess({message})),
                    catchError((error: Error) => of(GuestBookActions.addMessageFailure({errorMessage: error.message}))
                    )))));              
}