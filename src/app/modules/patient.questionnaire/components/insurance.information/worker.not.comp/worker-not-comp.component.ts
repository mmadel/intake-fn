import { Component, Input, OnInit } from '@angular/core';
import { WrokerNotComp } from 'src/app/models/questionnaire/Insurance/worker.not.comp';
import { InsurnacecommerialInfoRequired } from 'src/app/models/validation/insurnace.commerial.info.required';
import { InsuranceCompany } from 'src/app/modules/patient.admin/models/insurance.company.model';
import { InsuranceCompanyService } from 'src/app/modules/patient.admin/services/insurance.company/insurance-company.service';
import { PatientInsuranceQuestionnaireValidator } from 'src/app/validators/patient.validator/patient.insurance.questionnaire.validator';
import { ValidatorContainer } from 'src/app/validators/ValidatorContainer';
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
  isSecondaryInsurance: boolean | undefined = undefined;
  isMedicareCoverage: boolean | undefined = undefined;
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
        relationship: '',
        insuranceCompanyId: -1
      }
    } else {
      this.patientCommercialInsurance = this.patientStoreService.patientCommercialInsurance;
      this.isSecondaryInsurance = this.patientCommercialInsurance.secondaryInsurance ? true : false
      this.isMedicareCoverage = this.patientCommercialInsurance.medicareCoverage ? true : false
    }
  }
  isSecondaryInsuranceChange(val: string) {
    if (val === 'yes') {
      this.patientCommercialInsurance!.secondaryInsurance = {}
    }
    if (val === 'no') {
      this.patientCommercialInsurance!.secondaryInsurance = undefined;
    }

  }
  isMedicareCoverageChange(val: string) {
    if (val === 'yes') {
      this.patientCommercialInsurance!.medicareCoverage = {};
    }
    if (val === 'no') {
      this.patientCommercialInsurance!.medicareCoverage = undefined
    }
  }
  isPatientRelationshipDTOChange() {
    if (this.patientCommercialInsurance!.relationship !== 'Self') {
      this.patientCommercialInsurance!.patientRelationship = {}
    } else {
      this.patientCommercialInsurance!.patientRelationship = undefined
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

  public validate(): ValidatorContainer {
    var patientValidator = new PatientInsuranceQuestionnaireValidator();
    patientValidator.setInsurnacecommerialInfoRequired(this.insurnacecommerialInfoRequired)
    patientValidator.setCommmersialMode(this.patientCommercialInsurance)
    return patientValidator.validate();
  }
}
