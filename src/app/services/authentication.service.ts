import { environment } from '@/environments/environment.development'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SessionModule, TokenModule } from '../movie-data/type-declorate'

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    apiKey = environment.apiKey
    apiUrl = environment.apiUrl
    apiToken = environment.apiToken

    constructor(private http: HttpClient) {}
    public getAuthenticationToken() {
        return this.http.get<TokenModule>(`${this.apiUrl}authentication/token/new${this.apiKey}`)
    }
    public createNewSession(token: string) {
        return this.http.post<SessionModule>(`${this.apiUrl}authentication/session/new${this.apiKey}`, {
            request_token: token
        })
    }
    public getAccountDetails(sessionId: string) {
        return this.http.get<any>(`https://api.themoviedb.org/3/account${this.apiKey}&session_id=${sessionId}`)
    }
}
