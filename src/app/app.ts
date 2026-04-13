import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderOverlay } from './shared/components/loader-overlay/loader-overlay';
import { LoaderService } from './core/services/shared/loader.service';
import { inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Status } from './shared/components/status/status';
import { StatusService } from './core/services/shared/status.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderOverlay, AsyncPipe, Status],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private loaderService = inject(LoaderService);
  private statusService = inject(StatusService);
  loading$ = this.loaderService.loading$;
  status$ = this.statusService.type$;

  clearStatus() {
    this.statusService.clear();
  }
}
