export interface User {
    user?: string | null
    accountId: string | null
    sessionId: string | null
    error?: any
    success: boolean | string
}
export const userState: User = {
    accountId: null,
    user: null,
    sessionId: null,
    success: false,
    error: null
}
