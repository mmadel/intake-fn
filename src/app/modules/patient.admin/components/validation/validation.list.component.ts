import { Component, OnInit } from '@angular/core';
import { PatientRequiredFields } from 'src/app/models/validation/patient.fields';
import { PatientRequiredFieldsService } from '../../services/patient.required.fields.service';

@Component({
  selector: 'app-validation.list',
  templateUrl: './validation.list.component.html',
  styleUrls: ['./validation.list.component.css']
})
export class ValidationListComponent implements OnInit {
  patientFields: PatientRequiredFields;
  isBasicInfoReuqiredChanged: boolean = false;
  isMedicalInfoReuqiredChanged: boolean = false;
  constructor(private patientRequiredFieldsService: PatientRequiredFieldsService) { }

  ngOnInit(): void {
    this.retrieveBaiscInfoRequiredFields();
  }
  changeRequiredFields(model: string) {
    this.patientRequiredFieldsService.change(this.patientFields).subscribe(
      (response) => {
        this.handleInfoFlags(model,true);
        setTimeout(() => {
          this.handleInfoFlags(model , false);
        }, 2000);
      },
      (error) => {
        this.handleInfoFlags(model,false);
        console.log(error);
      });
  }
  handleInfoFlags(model: string, value:boolean) {
    if (model === 'basic')
      this.isBasicInfoReuqiredChanged = value
    if (model === 'medical')
      this.isMedicalInfoReuqiredChanged = value
  }
  retrieveBaiscInfoRequiredFields() {
    this.patientRequiredFieldsService.retrieve().subscribe(patientFields => {
      if (patientFields !== null) {
        this.patientFields = <PatientRequiredFields>patientFields;;
      } else {
        this.patientFields = new PatientRequiredFields();
        this.patientFields.basicInfo = {
          id: null,
          name: true,
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
      }
    });
  }


}
