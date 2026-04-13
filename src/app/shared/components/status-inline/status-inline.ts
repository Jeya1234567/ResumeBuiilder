import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-status-inline',
  imports: [],
  templateUrl: './status-inline.html',
  styleUrl: './status-inline.scss',
})
export class StatusInline {
@Input() text:string = '';
@Input() type:'success' | 'error' = 'success';
}
