import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PateintModelRequesterService {

  private payload = new BehaviorSubject('');
  currentValue = this.payload.asObservable();
  constructor() { }

  requestPateintModel(modelName: string) {
    this.payload.next(modelName);
  }

  sendPateintModel(model: string) {
    this.payload.next(model);
  }
  backPateintModel(model:string){
    this.payload.next(model);
  }
}
