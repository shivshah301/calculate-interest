import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public spinnerActive: EventEmitter<Boolean>;
  constructor() {
  this.spinnerActive = new EventEmitter();

  }

  activate(){
  this.spinnerActive.emit(true)
  }

  deactivate(){
  this.spinnerActive.emit(false)
  }
}
