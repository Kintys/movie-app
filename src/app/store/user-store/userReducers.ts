import { createReducer, on } from '@ngrx/store'
import { userState } from './userStates'
import {
    deleteUserAndAccId,
    loadAccountIdFailure,
    loadAccountIdSuccess,
    loadSessionIdFailure,
    loadSessionIdSuccess
} from './userActions'
export const UserReducers = createReducer(
    userState,
    // user session
    on(loadSessionIdSuccess, (state, { sessionId }) => {
        return {
            ...state,
            sessionId: sessionId
        }
    }),
    on(loadSessionIdFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        }
    }),
    // user account
    on(loadAccountIdSuccess, (state, { accountId, success, user }) => {
        return {
            ...state,
            accountId: accountId,
            success: success,
            user: user
        }
    }),
    on(loadAccountIdFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        }
    }),
    on(deleteUserAndAccId, (state) => {
        return {
            ...state,
            user: null,
            accountId: null,
            success: false
        }
    })
)
