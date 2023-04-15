import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgSelectOption, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular-pro';
import { result } from 'lodash';
import { mergeMap, tap } from 'rxjs';
import { Clinic } from 'src/app/modules/patient.admin/models/clinic.model';
import { ClinicService } from 'src/app/modules/patient.admin/services/clinic/clinic.service';
import { AuthService } from 'src/app/modules/security/service/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent extends HeaderComponent {
  clinics: Clinic[] = new Array();
  selectedClinicId: number;
  @ViewChild('userClinics') userClinics: ElementRef;
  public get classToggler(): ClassToggleService {
    return this._classToggler;
  }
  public set classToggler(value: ClassToggleService) {
    this._classToggler = value;
  }

  @Input() sidebarId: string = "sidebar1";



  public themeSwitch = new UntypedFormGroup({
    themeSwitchRadio: new UntypedFormControl('light'),
  });

  constructor(private _classToggler: ClassToggleService, private authService: AuthService, private router: Router
    , private clinicService: ClinicService) {
    super();
  }
  ngOnInit(): void {
    this.clinicService.getByUserId(Number(localStorage.getItem('userId') || {})).subscribe(response => {
      response.body?.forEach(element => {
        this.clinics.push(element);
      });

      this.clinicService.selectedClinic$.next(this.clinics[0].id)
    })
  }

  setTheme(value: string): void {
    this.themeSwitch.setValue({ themeSwitchRadio: value });
    this.classToggler.toggle('body', 'dark-theme');
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  setSelectedClinic(event: any) {
    console.log(event.target.value)
    this.clinicService.selectedClinic$.next(event.target.value);
  }
}
