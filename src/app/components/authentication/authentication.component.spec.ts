import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { AuthenticationComponent } from './authentication.component'
import { ButtonModule } from 'primeng/button'
import { selectUserName, selectSessionId } from '@/app/store/user-store/userSelectors'
import { loadSessionId, loadAccountId } from '@/app/store/user-store/userActions'
import { Location } from '@angular/common'
import { Subscription } from 'rxjs'

describe('AuthenticationComponent', () => {
    let component: AuthenticationComponent
    let fixture: ComponentFixture<AuthenticationComponent>
    let store: MockStore
    let location: Location

    const initialState = {}

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonModule, AuthenticationComponent],
            providers: [
                provideMockStore({ initialState }),
                {
                    provide: Location,
                    useValue: {
                        back: jest.fn()
                    }
                }
            ]
        }).compileComponents()

        store = TestBed.inject(MockStore)
        location = TestBed.inject(Location)

        fixture = TestBed.createComponent(AuthenticationComponent)
        component = fixture.componentInstance

        store.overrideSelector(selectUserName, null)
        store.overrideSelector(selectSessionId, null)

        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should navigate back if user exists on ngOnInit', () => {
        const backSpy = jest.spyOn(location, 'back')
        store.overrideSelector(selectUserName, 'testUser')

        component.ngOnInit()
        store.refreshState()

        expect(backSpy).toHaveBeenCalled()
    })

    it('should dispatch loadSessionId and loadAccountId on onAuth', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')

        component.onAuth()

        expect(dispatchSpy).toHaveBeenCalledWith(loadSessionId())

        store.overrideSelector(selectSessionId, 'mockSessionId')
        store.refreshState()

        expect(dispatchSpy).toHaveBeenCalledWith(loadAccountId({ sessionId: 'mockSessionId' }))
    })

    it('should unsubscribe on ngOnDestroy', () => {
        const unsubscribeSpy = jest.spyOn(Subscription.prototype, 'unsubscribe')
        component.ngOnDestroy()
        expect(unsubscribeSpy).toHaveBeenCalled()
    })

    it('should have the correct title', () => {
        expect(component.title).toBe('Please log in.')
    })
})
