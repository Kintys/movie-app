import { createSelector, createFeatureSelector } from '@ngrx/store'
import { User } from './userStates'

export const selectUser = createFeatureSelector<User>('userState')

export const selectSessionId = createSelector(selectUser, (state) => state.sessionId)

export const selectAccountId = createSelector(selectUser, (state) => state.accountId)

export const selectUserName = createSelector(selectUser, (state) => state.user)
