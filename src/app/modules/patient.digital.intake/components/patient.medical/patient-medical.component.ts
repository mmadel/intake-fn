import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import entityValues from 'src/app/modules/patient.admin/components/reports/_entity.values';
import { Provider } from '../../models/provider';
import { ProvidersService } from '../../services/provider/providers.service';


@Component({
  selector: 'patient-medical',
  templateUrl: './patient-medical.component.html',
  styleUrls: ['./patient-medical.component.css']
})
export class PatientMedicalComponent implements OnInit {
  @Input() form: FormGroup;
  provider: Provider = {}
  entityValues = entityValues;
  constructor(private providersService: ProvidersService) { }

  ngOnInit(): void {
    this.form.get('medical')?.get('providerNPI')?.valueChanges
      .pipe(
        filter(text => {
          if (!Number(text)) {
            this.provider.fullName = '';
            return false;
          }
          if (text === undefined) {
            this.provider.fullName = '';
            return false;
          }
          if (text.length > 1) {
            return true
          } else {
            this.provider.fullName = '';
            return false;
          }
        }),
        debounceTime(500),
        tap((value) => {

        }),
        switchMap((value: any) => {
          console.log(value)
          return this.providersService.findProviderByNPI(value)
            .pipe(
              finalize(() => {

              }),
            )
        }
        )
      ).subscribe(data => {
        this.provider = data
        if (this.provider.lastName !== null && this.provider.firstName !== null)
          this.provider.fullName = this.provider.lastName?.toLowerCase() + ',' + this.provider.firstName?.toLowerCase()
        else
          this.provider.fullName = ''

        this.form.get('medical')?.get('providerName')?.setValue(this.provider.fullName);
      },
        error => {
          console.log(JSON.stringify(error))
        });
  }
}
