import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressServiceService {
  private progressValue = new BehaviorSubject('0');
  currentProgressValue = this.progressValue.asObservable();
  constructor() { }
  updateProgress(val: string) {
    this.progressValue.next(val)
  }
}
