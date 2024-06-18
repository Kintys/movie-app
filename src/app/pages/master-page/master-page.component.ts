import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-master-page',
  standalone: true,
  imports: [NgClass],
  templateUrl: './master-page.component.html',
  styleUrl: './master-page.component.scss',
})
export class MasterPageComponent {
  public selectBgColor: string | undefined;
}
