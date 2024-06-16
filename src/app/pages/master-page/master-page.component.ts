import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-master-page',
  standalone: true,
  imports: [NgClass, InputSwitchModule, ReactiveFormsModule],
  templateUrl: './master-page.component.html',
  styleUrl: './master-page.component.scss',
})
export class MasterPageComponent {
  public isSelectBgColor = new FormControl<boolean>(false);
}
