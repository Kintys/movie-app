import { Component } from '@angular/core'
import { ImageModule } from 'primeng/image'
import { ButtonModule } from 'primeng/button'
import { RouterLink } from '@angular/router'
@Component({
    selector: 'app-page-not-found',
    standalone: true,
    imports: [ImageModule, ButtonModule, RouterLink],
    templateUrl: './page-not-found.component.html',
    styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
    titlePage: string = '404'
    subtitlePage: string = 'Something went wrong. Sorry, We can’t find the page you’re looking for.'
}
