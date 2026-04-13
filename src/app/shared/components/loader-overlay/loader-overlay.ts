import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader-overlay',
  imports: [CommonModule],
  templateUrl: './loader-overlay.html',
  styleUrl: './loader-overlay.scss',
})
export class LoaderOverlay {
@Input() show: boolean | null = false;
}
