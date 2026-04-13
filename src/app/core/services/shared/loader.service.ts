import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
private state = new BehaviorSubject(false);
loading$ = this.state.asObservable();

show() {
  this.state.next(true);
}

hide() {
  this.state.next(false);
}

}