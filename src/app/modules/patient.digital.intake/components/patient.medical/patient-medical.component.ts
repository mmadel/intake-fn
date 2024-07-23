import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { isObject, result } from 'lodash';
import { debounceTime, filter, finalize, Observable, share, switchMap, tap } from 'rxjs';
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
    this.providers = this.form.get('medical')?.get('providerSearchName')?.valueChanges
      .pipe(
        filter(text => {
          if (text.includes(':'))
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
        }), share()
      )
    this.providers?.subscribe(data => {
      if (data === null) {
        this.form.get('medical')?.get('providerName')?.setValue(null);
        this.form.get('medical')?.get('providerNPI')?.setValue(null);
      }
    })
    this.form.get('medical')?.get('providerSearchNPI')?.valueChanges
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
        var name: string | undefined;
        var npi: string | undefined;
        if (this.provider !== null) {
          name = this.provider.firstName?.toLowerCase() + ',' + this.provider.lastName?.toLowerCase();
          npi = this.provider.npi;
        } else {
          name = undefined;
          npi = undefined;
        }
        if (data !== '') {
          this.form.get('medical')?.get('providerName')?.setValue(name);
          this.form.get('medical')?.get('providerNPI')?.setValue(npi);
        }
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
    this.form.get('medical')?.get('providerName')?.setValue(event.split(':')[0]);
    this.form.get('medical')?.get('providerNPI')?.setValue(event.split(':')[1]);
  }
}
