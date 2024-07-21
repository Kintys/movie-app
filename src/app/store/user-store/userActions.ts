import { createAction, props } from '@ngrx/store'

// session id

export const loadSessionId = createAction('[SessionId] Load Session Id')

export const loadSessionIdSuccess = createAction('[SessionId] Load Session Id Success!', props<{ sessionId: string }>())

export const loadSessionIdFailure = createAction('[SessionId] Load Session Id Failure!', props<{ error: any }>())

// account id

export const loadAccountId = createAction('[AccountId] Load Account Id', props<{ sessionId: string | null }>())

export const loadAccountIdSuccess = createAction(
    '[AccountId] Load Account Id Success!',
    props<{ accountId: string; user: string; success: boolean | string }>()
)

export const loadAccountIdFailure = createAction('[AccountId] Load Account Id Failure!', props<{ error: any }>())

export const deleteUserAndAccId = createAction('[DeleteUser] Delete User And Account Id')
