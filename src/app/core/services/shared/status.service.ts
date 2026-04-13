import { Injectable, Input} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppMessage{
  type: 'success' | 'error';
  text: string;
}


@Injectable({
  providedIn: 'root',
})
export class StatusService {
private state = new BehaviorSubject<AppMessage | null>(null);


type$ = this.state.asObservable();


showSuccess(message:string){
  this.state.next({type:'success',text:message});
  setTimeout(() => {
    this.clear();
  }, 3000);;
 }

showError(message:string){
  this.state.next({type:'error',text:message});
    setTimeout(() => {
      this.clear();
    }, 3000);
 }

 clear(){
  this.state.next(null);
 }
}