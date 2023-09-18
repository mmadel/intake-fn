import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient/patient.model';
import { MedicareCoverage } from 'src/app/models/questionnaire/Insurance/medicare.coverage';
import { PatientRelationship } from 'src/app/models/questionnaire/Insurance/patient.relationship';
import { SecondaryInsurance } from 'src/app/models/questionnaire/Insurance/secondary.Insurance';
import { WrokerNotComp } from 'src/app/models/questionnaire/Insurance/worker.not.comp';
import { InsurnacecommerialInfoRequired } from 'src/app/models/validation/insurnace.commerial.info.required';
import { LocalService } from 'src/app/modules/common';
import { InsuranceCompany } from 'src/app/modules/patient.admin/models/insurance.company.model';
import { InsuranceCompanyService } from 'src/app/modules/patient.admin/services/insurance.company/insurance-company.service';
import { PatientCommercialInsurance } from '../../../models/intake/Insurance/patient.commercial.insurance';
import { PatientStoreService } from '../../../service/store/patient-store.service';

@Component({
  selector: 'app-worker-not-comp',
  templateUrl: './worker-not-comp.component.html',
  styleUrls: ['./worker-not-comp.component.css']
})
export class WorkerNotCompComponent implements OnInit {
  InsuranceCompanies: InsuranceCompany[] = new Array();
  model: WrokerNotComp
  patientCommercialInsurance?: PatientCommercialInsurance;
  isSecondaryInsurance: string;
  isMedicareCoverage: string;
  @Input() insurnacecommerialInfoRequired: InsurnacecommerialInfoRequired
  constructor(private patientStoreService: PatientStoreService, private insuranceCompanyService: InsuranceCompanyService) { }

  ngOnInit(): void {
    this.insuranceCompanyService.get().subscribe((response) => {
      response.body?.forEach(element => {
        this.InsuranceCompanies?.push(element);
      });
    })
    if (this.patientStoreService.patientCommercialInsurance === undefined) {
      this.patientCommercialInsurance = {
        secondaryInsurance: {},
        medicareCoverage: {},
        patientRelationship: {}
      }

    } else {
      this.patientCommercialInsurance = this.patientStoreService.patientCommercialInsurance;
    }
  }
  isSecondaryInsuranceChange(val: string) {
    this.isSecondaryInsurance = val;
    if (val === 'yes') {
      this.model.isSecondaryInsurance = true
      this.model.secondaryInsuranceDTO = new SecondaryInsurance();
    }
    if (val === 'no') {
      this.model.isSecondaryInsurance = false
      this.model.secondaryInsuranceDTO = undefined;
      this.model.isMedicareCoverage = undefined
      this.model.medicareCoverageDTO = undefined;
    }

  }
  isMedicareCoverageChange(val: string) {
    this.isMedicareCoverage = val;
    if (val === 'yes') {
      this.model.isMedicareCoverage = true
      this.model.medicareCoverageDTO = new MedicareCoverage()
    }
    if (val === 'no') {
      this.model.isMedicareCoverage = false
      this.model.medicareCoverageDTO = undefined;
    }
  }
  isPatientRelationshipDTOChange() {
    if (this.model.relationship !== 'Self') {
      this.model.patientRelationshipDTO = new PatientRelationship();
    } else {
      this.model.patientRelationshipDTO = undefined
    }
  }
  isRequiredField(name: string): boolean {
    var field: boolean = false;
    Object.entries(this.insurnacecommerialInfoRequired)
      .forEach(([key, value]) => {
        if (key === name) {
          field = value;
        }
      })
    return field;
  }

  // public validate(): ValidatorContainer {
  //   var validatorContainer: ValidatorContainer;
  //   return null;
  // }
}
