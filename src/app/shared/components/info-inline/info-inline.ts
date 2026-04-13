import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-inline',
  imports: [CommonModule],
  templateUrl: './info-inline.html',
  styleUrl: './info-inline.scss',
})
export class InfoInline {
@Input() text:string = '';
}
