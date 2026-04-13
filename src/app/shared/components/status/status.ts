import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-status',
  imports: [CommonModule],
  templateUrl: './status.html',
  styleUrl: './status.scss',
})
export class Status {
@Input() text: string = '';
@Input() type: 'success' | 'error' = 'success';
@Output() close = new EventEmitter<void>();

}
