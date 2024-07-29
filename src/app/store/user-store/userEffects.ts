import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Injectable } from '@angular/core'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { AuthenticationService } from '@/app/services/authentication.service'
import {
    loadAccountId,
    loadAccountIdFailure,
    loadAccountIdSuccess,
    loadSessionId,
    loadSessionIdFailure,
    loadSessionIdSuccess
} from './userActions'

@Injectable()
export class UserEffect {
    loadSessionId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadSessionId),
            mergeMap(() => {
                return this.authenticationAPI.createNewSession().pipe(
                    map((session) =>
                        loadSessionIdSuccess({
                            sessionId: session.session_id
                        })
                    ),
                    catchError((error) =>
                        of(
                            loadSessionIdFailure({
                                error: error
                            })
                        )
                    )
                )
            })
        )
    )
    loadAccountId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAccountId),
            mergeMap((props) => {
                return this.authenticationAPI.getAccountDetails(props.sessionId).pipe(
                    map((account) =>
                        loadAccountIdSuccess({
                            accountId: account.id,
                            user: account.username,
                            success: 'Welcome!'
                        })
                    ),
                    catchError((error) =>
                        of(
                            loadAccountIdFailure({
                                error: error
                            })
                        )
                    )
                )
            })
        )
    )
    constructor(private actions$: Actions, private authenticationAPI: AuthenticationService) {}
}
