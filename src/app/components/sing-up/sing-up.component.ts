import { Component, EventEmitter, Output } from '@angular/core'
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
} from '@angular/forms'
import { Store } from '@ngrx/store'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { PasswordModule } from 'primeng/password'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { CommonModule } from '@angular/common'
import { DividerModule } from 'primeng/divider'
import { createAccountWithPassAndEmail } from '@/app/store/user-store/userActions'
import { GeneralComponentModuleText } from '@/app/shared/type-declorate'
@Component({
    selector: 'app-sing-up',
    standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        PasswordModule,
        ReactiveFormsModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        DividerModule,
        CommonModule
    ],
    templateUrl: './sing-up.component.html',
    styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {
    isErrorClassEmailShow: boolean = false
    isErrorClassPassShow: boolean = false
    isErrorClassRepeatPasswordShow: boolean = false
    singUpForm!: FormGroup
    emailInvalidMassage: string = ''
    passwordInvalidMassage: string = ''
    repeatPasswordInvalidMassage: string = ''
    generalComponentText?: GeneralComponentModuleText
    @Output() isCloseSingUpPopup = new EventEmitter<boolean>()
    constructor(private store: Store) {}

    ngOnInit(): void {
        this.generalComponentText = {
            email: {
                label: 'email'
            },
            password: {
                label: 'password',
                tooltipText: {
                    label: 'Suggestions',
                    list: [
                        'At least one lowercase',
                        'At least one lowercase',
                        'At least one numeric',
                        'Minimum 8 characters'
                    ]
                }
            },
            repeatPassword: {
                label: 'repeat password'
            }
        }
        this.singUpForm = new FormGroup(
            {
                email: new FormControl('', [Validators.email, Validators.required]),
                password: new FormControl('', [
                    Validators.required,
                    Validators.pattern(
                        /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
                    )
                ]),
                repeatPassword: new FormControl('')
            },
            { validators: this.customPasswordMatching.bind(this) }
        )
        this.singUpForm.valueChanges.subscribe(() => {
            this.updateErrorMessages()
        })
    }
    private customPasswordMatching(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value
        const repeatPassword = control.get('repeatPassword')?.value
        return password === repeatPassword ? null : { passwordMismatchError: true }
    }
    private updateErrorMessages() {
        const emailControl = this.singUpForm.get('email')
        const passwordControl = this.singUpForm.get('password')
        const formErrors = this.singUpForm.errors

        if (emailControl && emailControl.errors) {
            if (emailControl.errors['required']) {
                this.emailInvalidMassage = 'Email is required'
            } else if (emailControl.errors['email']) {
                this.emailInvalidMassage = 'Invalid email format'
            }
        } else {
            this.emailInvalidMassage = ''
        }

        if (passwordControl && passwordControl.errors) {
            if (passwordControl.errors['required']) {
                this.passwordInvalidMassage = 'Password is required'
            } else if (passwordControl.errors['pattern']) {
                this.passwordInvalidMassage = 'Invalid password format'
            }
        } else {
            this.passwordInvalidMassage = ''
        }

        if (formErrors && formErrors['passwordMismatchError']) {
            this.repeatPasswordInvalidMassage = 'Passwords do not match'
        } else {
            this.repeatPasswordInvalidMassage = ''
        }
    }
    private showErrors() {
        ;(this.isErrorClassEmailShow = true),
            (this.isErrorClassPassShow = true),
            (this.isErrorClassRepeatPasswordShow = true)
    }
    closeSingUpPopup() {
        this.isCloseSingUpPopup.emit(true)
    }
    onSubmit() {
        if (!this.singUpForm.valid) {
            this.showErrors(), this.updateErrorMessages()
        } else {
            this.store.dispatch(
                createAccountWithPassAndEmail({
                    email: this.singUpForm.value.email,
                    password: this.singUpForm.value.password
                })
            )
        }
    }
}
