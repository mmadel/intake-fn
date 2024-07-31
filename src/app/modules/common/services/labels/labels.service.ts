import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  constructor(private http: HttpClient) { }
  getLabels(): Observable<any> {
    return this.http.get('/assets/labels.json');
  }
}
