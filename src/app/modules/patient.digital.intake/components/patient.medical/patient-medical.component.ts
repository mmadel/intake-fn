import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { isObject } from 'lodash';
import { debounceTime, filter, finalize, Observable, switchMap, tap } from 'rxjs';
import entityValues from 'src/app/modules/patient.admin/components/reports/_entity.values';
import { Provider } from '../../models/provider';
import { ProvidersService } from '../../services/provider/providers.service';
import { ValidationExploder } from '../create/validators/validation.exploder';


@Component({
  selector: 'patient-medical',
  templateUrl: './patient-medical.component.html',
  styleUrls: ['./patient-medical.component.css']
})
export class PatientMedicalComponent implements OnInit {
  @Input() form: FormGroup;
  provider: Provider = {}
  providers: Observable<Provider[]> | undefined;
  test: Provider[];
  entityValues = entityValues;
  @Input() stepper: MatStepper
  isValidForm: boolean = false;
  constructor(private providersService: ProvidersService) { }


  ngOnInit(): void {
    this.providers = this.form.get('medical')?.get('providerName')?.valueChanges
      .pipe(
        filter(text => {
          if (isObject(text))
            return false;
          if (text === undefined) {
            return false;
          }
          if (text !== null && text?.includes(','))
            return false;
          if (Number.isNaN(text)) {
            return false;
          }
          if (text?.length > 1) {
            return true
          } else {

            return false;
          }
        }),
        debounceTime(1000),
        switchMap((value: any) => {
          return this.providersService.findProviderByName(value)
        })
      )
    this.providers?.subscribe((res: any) => {
      if (res.length === 0) {
        console.log('Emtpy')
        this.form.get('medical')?.get('providerNPI')?.setValue('');
      }
    })
    this.form.get('medical')?.get('providerNPI')?.valueChanges
      .pipe(
        filter(text => {
          if (!Number(text)) {
            return false;
          }
          if (text === '')
            return false;
          if (text === undefined) {
            return false;
          }
          if (text.length > 1) {
            return true
          } else {
            return false;
          }
        }),
        debounceTime(500),
        tap((value) => {

        }),
        switchMap((value: any) => {
          return this.providersService.findProviderByNPI(value)
            .pipe(
              finalize(() => {

              }),
            )
        }
        )
      ).subscribe(data => {
        this.provider = data
        var name: string;
        if (this.provider !== null)
          name = this.provider.firstName?.toLowerCase() + ',' + this.provider.lastName?.toLowerCase()
        else
          name = ''
        if (data !== '')
          this.form.get('medical')?.get('providerName')?.setValue(name);
      },
        error => {
          console.log(JSON.stringify(error))
        });
  }
  next() {
    if (this.form.get('medical')?.valid) {
      this.stepper.next();
      this.isValidForm = false;
    } else {
      this.isValidForm = true;
      ValidationExploder.explode(this.form, 'medical')
    }
  }
  pickProvider(event: any) {
    this.form.get('medical')?.get('providerNPI')?.setValue(event.split(':')[1]);
  }
}
