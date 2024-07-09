import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientDocumentService {
  public selectedDocument$: BehaviorSubject<FormData | null> = new BehaviorSubject<FormData | null>(null);
  constructor() { }
}
