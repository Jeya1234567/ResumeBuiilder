import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-loading-inline',
  imports: [],
  templateUrl: './loading-inline.html',
  styleUrl: './loading-inline.scss',
})
export class LoadingInline {
  @Input() message: string = 'Loading...';
}
