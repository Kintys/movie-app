import { closeLoginPopup, loginWithEmailAndPass, loginWithGoogle } from '@/app/store/user-store/userActions'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { CommonModule } from '@angular/common'
import { selectLoginPopup } from '@/app/store/user-store/userSelectors'
import { GeneralComponentModuleText } from '@/app/shared/type-declorate'
import { SingUpComponent } from '../sing-up/sing-up.component'
import { ClearObservable } from '@/app/shared/clearObserveble'
import { takeUntil } from 'rxjs'

@Component({
    selector: 'app-login-popup',
    standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        ReactiveFormsModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        CommonModule,
        SingUpComponent
    ],
    templateUrl: './login-popup.component.html',
    styleUrl: './login-popup.component.scss'
})
export class LoginPopupComponent extends ClearObservable implements OnInit {
    logForm!: FormGroup
    isVisiblePopup: boolean = false
    isVisibleSingUp: boolean = false
    isErrorEmailShow: boolean = false
    isErrorPassShow: boolean = false
    emailErrorText: string = 'must be required'
    passwordErrorText: string = 'must be required'
    selectedLoginPopup$ = this.store.select(selectLoginPopup)
    generalComponentText?: GeneralComponentModuleText
    constructor(private store: Store) {
        super()
    }

    ngOnInit(): void {
        this.generalComponentText = {
            email: {
                label: 'email'
            },
            password: {
                label: 'password'
            }
        }
        this.logForm = new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', Validators.required)
        })
        this.logForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.updateErrorMessages()
        })
        this.selectedLoginPopup$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
            this.isVisiblePopup = val
        })
    }
    private updateErrorMessages() {
        const emailControl = this.logForm.get('email')
        const passwordControl = this.logForm.get('password')

        if (emailControl && emailControl.errors) {
            if (emailControl.errors['required']) {
                this.emailErrorText = 'Email is required'
            } else if (emailControl.errors['email']) {
                this.emailErrorText = 'Invalid email format'
            }
        } else {
            this.emailErrorText = ''
        }

        if (passwordControl && passwordControl.errors) {
            if (passwordControl.errors['required']) {
                this.passwordErrorText = 'Password is required'
            }
        } else {
            this.passwordErrorText = ''
        }
    }
    private showErrors() {
        ;(this.isErrorEmailShow = true), (this.isErrorPassShow = true)
    }

    loginWithGoogleAcc() {
        this.store.dispatch(loginWithGoogle())
    }
    showDialog(value: boolean) {
        this.isVisiblePopup = value
    }
    showSingUp() {
        this.isVisibleSingUp = true
    }
    onSubmit() {
        if (!this.logForm.valid) {
            this.showErrors(), this.updateErrorMessages()
        } else {
            this.store.dispatch(
                loginWithEmailAndPass({
                    email: this.logForm.value.email,
                    password: this.logForm.value.password
                })
            )
        }
    }

    closeDialog($event: boolean) {
        if (!$event) this.store.dispatch(closeLoginPopup({ loginPopup: $event }))
    }
}
