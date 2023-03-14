import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PateintModelRequesterService {

  private modelName = new BehaviorSubject('');
  currentModelName = this.modelName.asObservable();

  private modelValue = new BehaviorSubject('');
  currentModel = this.modelValue.asObservable();
  constructor() {}

  requestPateintModel(modelName: string) {
    this.modelName.next(modelName);
  }

  sendPateintModel(model: string) {
    this.modelValue.next(model);
  }
  backPateintModel(model:string){
    this.modelValue.next(model);
  }
}
