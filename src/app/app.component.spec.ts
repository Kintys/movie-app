import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { MessageService } from 'primeng/api'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { ActivatedRoute } from '@angular/router'

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>
    let component: AppComponent
    let messageService: jest.Mocked<MessageService>
    let store: jest.Mocked<Store<any>>
    beforeEach(() => {
        const messageServiceSpy = {
            clear: jest.fn(),
            add: jest.fn()
        }

        const storeSpy = {
            select: jest.fn(),
            dispatch: jest.fn()
        }
        const activatedRouteSpy = {}

        TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                { provide: MessageService, useValue: messageServiceSpy },
                { provide: Store, useValue: storeSpy },
                { provide: ActivatedRoute, useValue: activatedRouteSpy }
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(AppComponent)
        component = fixture.componentInstance
        messageService = TestBed.inject(MessageService) as jest.Mocked<MessageService>
        store = TestBed.inject(Store) as jest.Mocked<Store<any>>

        store.select.mockReturnValue(of('Test message'))
    })

    it('should create the component', () => {
        expect(component).toBeTruthy()
    })

    // it('should subscribe to selectedSuccess$ and call showToast1 on ngOnInit', fakeAsync(() => {

    //     jest.spyOn(component, 'showToast1').mockImplementation()

    //     component.ngOnInit()
    //     tick()

    //     expect(component.showToast1).toHaveBeenCalledWith('Test message')
    // }))

    // it('should call messageService.clear and messageService.add when showToast1 is called with a message', () => {
    //     const message = 'Test success message'

    //     component.showToast1(message)

    //     expect(messageService.clear).toHaveBeenCalled()

    //     expect(messageService.add).toHaveBeenCalledWith({
    //         key: 'toast1',
    //         severity: 'success',
    //         summary: 'Success',
    //         detail: message
    //     })
    // })

    // it('should not call messageService.clear if showToast1 is called with undefined', () => {
    //     component.showToast1(undefined)

    //     expect(messageService.clear).not.toHaveBeenCalled()

    //     expect(messageService.add).toHaveBeenCalledWith({
    //         key: 'toast1',
    //         severity: 'success',
    //         summary: 'Success',
    //         detail: undefined
    //     })
    // })

    // it('should dispatch deleteSuccessStatus after timeout in showToast1', fakeAsync(() => {
    //     component.showToast1('Test success message')

    //     tick(1000)

    //     expect(store.dispatch).toHaveBeenCalledWith(deleteSuccessStatus())
    // }))
})

jest.mock('uuid', () => ({
    v4: () => 'mock-uuid'
}))
