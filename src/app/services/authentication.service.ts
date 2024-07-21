import { environment } from '@/environments/environment.development'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SessionModule, TokenModule } from '../movie-data/type-declorate'
import { switchMap, tap } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    readonly apiKey = environment.apiKey
    readonly apiUrl = environment.apiUrl
    readonly apiToken = environment.apiToken
    readonly userName = environment.userName
    readonly userPass = environment.userPassword
    id = {}
    constructor(private http: HttpClient) {}
    public createNewSession() {
        return this.http.get<TokenModule>(`${this.apiUrl}authentication/token/new${this.apiKey}`).pipe(
            switchMap((tokenRes) => {
                return this.http.post<TokenModule>(
                    `${this.apiUrl}authentication/token/validate_with_login${this.apiKey}`,
                    {
                        username: this.userName,
                        password: this.userPass,
                        request_token: tokenRes.request_token
                    }
                )
            }),
            switchMap((validRes) => {
                return this.http.post<SessionModule>(`${this.apiUrl}authentication/session/new${this.apiKey}`, {
                    request_token: validRes.request_token
                })
            })
        )
    }
    getAccountDetails(sessionId: string | null) {
        return this.http.get<any>(`${this.apiUrl}account${this.apiKey}&session_id=${sessionId}`)
    }
}
