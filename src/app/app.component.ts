import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { HeaderComponent } from './components/header/header.component'
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api'
import { Store } from '@ngrx/store'
import { selectSuccessStatus } from './store/movie-store/movieSelector'
import { deleteSuccessStatus } from './store/movie-store/movieActions'
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ButtonModule, HeaderComponent, ToastModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [MessageService]
})
export class AppComponent implements OnInit {
    constructor(private messageService: MessageService, private store: Store) {}
    selectedSuccess$ = this.store.select(selectSuccessStatus)
    ngOnInit(): void {
        this.selectedSuccess$.subscribe((status) => {
            if (status) this.showToast1(status)
        })
    }
    showToast1(msg: string) {
        this.messageService.clear()
        this.messageService.add({ key: 'toast1', severity: 'success', summary: 'Success', detail: msg })
        setTimeout(() => {
            this.store.dispatch(deleteSuccessStatus())
        }, 1000)
    }
}
