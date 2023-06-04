import { Component, OnInit } from '@angular/core';
import { PatientRequiredFields } from 'src/app/models/validation/patient.fields';
import { PatientRequiredFieldsService } from '../../services/patient.required.fields.service';
export interface WorkerTypes {
  typeName: string,
  typeValue: string
}
@Component({
  selector: 'app-validation.list',
  templateUrl: './validation.list.component.html',
  styleUrls: ['./validation.list.component.css']
})

export class ValidationListComponent implements OnInit {
  patientFields: PatientRequiredFields;
  isBasicInfoReuqiredChanged: boolean = false;
  isMedicalInfoReuqiredChanged: boolean = false;
  isMedicalHistoryInfoReuqiredChanged: boolean = false;
  isInsuranceInfoReuqiredChanged: boolean = false;
  workersTypes: WorkerTypes[] = [
    { typeName: 'CompNoFault-Worker', typeValue: 'comp' },
    { typeName: 'Commercial-Worker', typeValue: 'commercial' }
  ]
  workerType: string = '';
  constructor(private patientRequiredFieldsService: PatientRequiredFieldsService) { }

  ngOnInit(): void {
    this.retrieveBaiscInfoRequiredFields();
  }
  changeRequiredFields(model: string) {
    console.log(JSON.stringify(this.patientFields))
    this.patientRequiredFieldsService.change(this.patientFields).subscribe(
      (response) => {
        this.handleInfoFlags(model, true);
        setTimeout(() => {
          this.handleInfoFlags(model, false);
        }, 2000);
      },
      (error) => {
        this.handleInfoFlags(model, false);
        console.log(error);
      });
  }
  handleInfoFlags(model: string, value: boolean) {
    if (model === 'basic')
      this.isBasicInfoReuqiredChanged = value
    if (model === 'medical')
      this.isMedicalInfoReuqiredChanged = value
    if (model === 'medical-history')
      this.isMedicalHistoryInfoReuqiredChanged = value;
    if (model === 'insurance')
      this.isInsuranceInfoReuqiredChanged = value;
  }
  retrieveBaiscInfoRequiredFields() {
    this.patientRequiredFieldsService.retrieve().subscribe(patientFields => {
      if (patientFields !== null) {
        this.patientFields = <PatientRequiredFields>patientFields;;
      } else {
        this.patientFields = new PatientRequiredFields();
        this.patientFields.basicInfo = {
          id: null,
          name:true,
          firstName: true,
          middleName:true,
          lastName:true,
          birthDate: true,
          gender: true,
          maritalStatus: true,
          phone: true,
          email: true,
          patientId: true,
          emergencyContact: true
        }

        this.patientFields.addressInfoRequired = {
          id: null,
          type: true,
          first: true,
          second: true,
          country: true,
          zipCode: true
        }
        this.patientFields.medicalInfoRequired = {
          id: null,
          recommendation: false,
          recommendedDoctorName: false,
          recommendedDoctorNpi: false,
          recommendedDoctorFax: false,
          recommendedDoctorAddress: false,
          recommendedEntityName: false,
          physicalTherapy: false,
          physicalTherapyLocation: false,
          physicalTherapyNumberOfVisit: false,
          appointmentBooking: false,
          resultSubmissionFamily: false,
          primaryDoctor: false,
        }
        this.patientFields.medicalHistoryInfoRequired = {
          id: null,
          height: false,
          weight: false,
          evaluationReason: false,
          medicationPrescription: false,
          patientCondition: false,
          scanningTest: false,
          scanningTestValue: false,
          metalImplantation: false,
          pacemaker: false,
          surgeriesList: false,
        }
        this.patientFields.insurnaceCompInfoRequired = {
          compNoFault: true,
          relatedInjury: false,
          accidentDate: false,
          workerStatus: false,
          address: false,
          fax: false,
          insuranceName: false,
          claimNumber: false,
          adjusterName: false,
          adjusterPhone: false,
          attorneyName: false,
          attorneyPhone: false,
          caseStatus: false
        }
        this.patientFields.insurnacecommerialInfoRequired = {
          insuranceCompany: false,
          memberId: false,
          ploicyId: false,
          relationship: false,
          secondryInsurance: false,
          policyHolderFirstName: false,
          policyHolderMiddleName: false,
          policyHolderLastName: false,
          secondryInsuranceCompany: false,
          secondryInsuranceMemberId: false,
          medicareCoverage: false,
          employerFirstName: false,
          employerMiddleName: false,
          employerLastName: false,
          employerPhone: false
        }
      }
    });
  }
}
