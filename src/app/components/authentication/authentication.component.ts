import { AuthenticationService } from '@/app/services/authentication.service'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { ButtonModule } from 'primeng/button'

@Component({
    selector: 'app-authentication',
    standalone: true,
    imports: [ButtonModule, RouterLink],
    templateUrl: './authentication.component.html',
    styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent implements OnInit {
    title: string = 'Please log in.'
    token?: string
    sessionId?: string
    id?: string
    showBtn: boolean = false
    constructor(private authServices: AuthenticationService, private router: ActivatedRoute) {}
    ngOnInit(): void {
        if (this.router.snapshot.queryParams['approved']) {
            this.title = 'Thank you!'
            this.showBtn = true
            this.token = localStorage.getItem('token')!
            this.authServices.createNewSession(this.token).subscribe((newSession) => {
                localStorage.setItem('sessionId', newSession.session_id)
                this.authServices.getAccountDetails(newSession.session_id).subscribe((val) => {
                    localStorage.setItem('accId', val.id)
                })
            })
        }
    }
    onAuth() {
        this.authServices.getAuthenticationToken().subscribe(async (val) => {
            await this.openWindow(val.request_token)
            localStorage.setItem('token', val.request_token)
        })
    }
    // виглядає погано, але кращого не придумав =)
    async openWindow(token: string) {
        const url = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:4200/auth`
        const windowFeatures =
            'width=800,height=600,left=200,top=100,menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes'
        const newWindow = window.open(url, '_blank', windowFeatures)
        if (newWindow) {
            window.close()
        }
    }
}
