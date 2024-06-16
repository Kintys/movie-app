import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieManagerComponent } from './components/movie-manager/movie-manager.component';
import { MasterPageComponent } from './pages/master-page/master-page.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MovieManagerComponent,
    RouterOutlet,
    MasterPageComponent,
    SidebarModule,
    ButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-project';
  public sidebarVisible: boolean = false;
}
