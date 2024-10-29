import { Component, OnInit } from '@angular/core'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { CalendarModule } from 'primeng/calendar'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { MultiSelectModule } from 'primeng/multiselect'
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { AsyncPipe, CommonModule } from '@angular/common'
import { Store } from '@ngrx/store'
import { closeSubscribePopup, sendSubscribeEmail } from '@/app/store/user-store/userActions'
import { DialogModule } from 'primeng/dialog'
import { selectSubscribePopup } from '@/app/store/user-store/userSelectors'
import { ClearObservable } from '@/app/shared/clearObserveble'
import { takeUntil } from 'rxjs'
import { ControlKeys, GeneralComponentModuleText, InvalidTextObject } from '@/app/shared/type-declorate'
import { selectMovieGenre } from '@/app/store/movie-store/movieSelector'
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component'

@Component({
    selector: 'app-subscribe-bar',
    standalone: true,
    imports: [
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        CommonModule,
        CalendarModule,
        ReactiveFormsModule,
        MultiSelectModule,
        CheckboxModule,
        DialogModule,
        AsyncPipe,
        PrivacyPolicyComponent
    ],
    templateUrl: './subscribe-bar.component.html',
    styleUrl: './subscribe-bar.component.scss'
})
export class SubscribeBarComponent extends ClearObservable implements OnInit {
    isVisiblePopup: boolean = false
    subscribeForm!: FormGroup
    invalidStatus!: InvalidTextObject
    genreParams$ = this.store.select(selectMovieGenre)
    selectedSubscribePopup$ = this.store.select(selectSubscribePopup)
    openDialog: boolean = false
    generalComponentText?: GeneralComponentModuleText
    isInvalid: boolean = false
    constructor(private store: Store) {
        super()
    }
    ngOnInit(): void {
        this.subscribeForm = new FormGroup({
            name: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            dateAge: new FormControl('', Validators.required),
            agreement: new FormControl(false, [Validators.requiredTrue])
        })
        //==========================================================
        this.selectedSubscribePopup$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
            this.isVisiblePopup = val
        })

        this.subscribeForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.updateErrorMessages()
        })

        //===========================================================

        this.invalidStatus = {
            name: {
                textError: '',
                isShowErrorMassage: false
            },
            email: {
                textError: '',
                isShowErrorMassage: false
            },
            genre: {
                textError: '',
                isShowErrorMassage: false
            },
            dateAge: {
                textError: '',
                isShowErrorMassage: false
            },
            agreement: {
                textError: '',
                isShowErrorMassage: false
            }
        }
        this.generalComponentText = {
            name: {
                label: 'Your Name'
            },
            email: {
                label: 'Your Email'
            },
            genre: {
                label: 'Choose Your Favorite Genre'
            },
            date: {
                label: 'Your Birthdate'
            },
            agreement: {
                text: 'I agree to the Privacy Policy. For more information about how we process your personal data, please see our'
            }
        }
    }
    onSubmit($event: Event) {
        if (!this.subscribeForm.valid) {
            this.showError()
            this.updateErrorMessages()
        } else {
            this.store.dispatch(sendSubscribeEmail({ templateForm: $event }))
        }
    }
    showError() {
        Object.keys(this.invalidStatus).forEach((key) => {
            if (key !== 'isInvalid') {
                this.invalidStatus[key as keyof InvalidTextObject].isShowErrorMassage = true
            }
        })
        this.isInvalid = true
    }
    showAgreementDialog() {
        this.openDialog = true
    }

    showDialog(value: boolean) {
        this.isVisiblePopup = value
    }
    private updateErrorMessages() {
        const controls: {
            control: AbstractControl<string> | null
            key: ControlKeys
            requiredMsg: string
            invalidMsg?: string
        }[] = [
            { control: this.subscribeForm.get('name'), key: 'name', requiredMsg: 'Name is required' },
            {
                control: this.subscribeForm.get('email'),
                key: 'email',
                requiredMsg: 'Email is required',
                invalidMsg: 'Invalid email format'
            },
            { control: this.subscribeForm.get('dateAge'), key: 'dateAge', requiredMsg: 'Date is required' },
            { control: this.subscribeForm.get('agreement'), key: 'agreement', requiredMsg: 'Agreement is required' }
        ]
        controls.forEach(({ control, key, requiredMsg, invalidMsg }) => {
            this.invalidStatus[key].textError = this.getErrorMessage(control, key, requiredMsg, invalidMsg)
        })
    }
    private getErrorMessage(
        control: AbstractControl<string> | null,
        key: ControlKeys,
        requiredMsg: string,
        invalidMsg?: string
    ): string {
        if (control && control.errors) {
            if (
                (control.untouched && this.isInvalid) ||
                (control.touched && !control.dirty && this.isInvalid) ||
                (control.dirty && control.errors['required'])
            ) {
                this.invalidStatus[key].isShowErrorMassage = true
                return requiredMsg
            } else if (invalidMsg && control.errors['email'] && control.dirty) {
                this.invalidStatus[key].isShowErrorMassage = true
                return invalidMsg
            }
        }
        this.invalidStatus[key].isShowErrorMassage = false
        return ''
    }

    closeDialog($event: boolean) {
        if (!$event) this.store.dispatch(closeSubscribePopup({ subscribePopup: $event }))
    }
}
