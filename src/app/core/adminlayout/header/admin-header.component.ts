import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular-pro';
import * as moment from 'moment';
import { LocalService } from 'src/app/modules/common';
import { Clinic } from 'src/app/modules/patient.admin/models/clinic.model';
import { ClinicService } from 'src/app/modules/patient.admin/services/clinic/clinic.service';
import { CacheClinicService } from 'src/app/modules/patient.digital.intake/services/cache.clinic/cache-clinic.service';
import { KcAuthServiceService } from 'src/app/modules/security/service/kc/kc-auth-service.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})


export class AdminHeaderComponent extends HeaderComponent {
  startDate: number;
  endDate: number;

  userName: string | undefined;
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

  constructor(private _classToggler: ClassToggleService, private router: Router
    , private clinicService: ClinicService
    , private localService: LocalService
    , private ksAuthServiceService: KcAuthServiceService) {
    super();
  }
  ngOnInit(): void {
    this.ksAuthServiceService.loadUserProfile()
      .then((userProfile) => {
        this.userName = userProfile.username?.charAt(0).toUpperCase()
        this.clinicService.getByUserId(userProfile.id).subscribe(response => {
          response.body?.forEach(element => {
            this.clinics.push(element);
          });
          this.clinicService.selectedClinic$.next(this.clinics[0].id)
        })
      })
  }

  setTheme(value: string): void {
    this.themeSwitch.setValue({ themeSwitchRadio: value });
    this.classToggler.toggle('body', 'dark-theme');
  }
  logout() {
    this.ksAuthServiceService.logout()
  }
  setSelectedClinic(event: any) {
    this.clinicService.selectedClinic$.next(event.target.value)
  }
}
