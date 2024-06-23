import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public selectBgColor: string | undefined;
}
