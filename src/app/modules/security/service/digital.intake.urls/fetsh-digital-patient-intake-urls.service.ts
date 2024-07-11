import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FetshDigitalPatientIntakeUrlsService {
  private digital_urls: string[] = ['digital-intake', 'patient/create', 'agreement', 'insurance/company/find', 'patient/upload'];
  constructor(private router: Router) { }
  isDigitalIntakeURLS() {
    var url: string = this.router.routerState.snapshot.url;
    return this.digital_urls.some(segment => url.includes(segment));
  }
}
