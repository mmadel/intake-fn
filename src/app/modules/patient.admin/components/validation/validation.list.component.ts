import { Component, OnInit } from '@angular/core';
import { PatientFields } from 'src/app/models/validation/patient.fields';
import { PatientRequiredFieldsService } from '../../services/patient.required.fields.service';

@Component({
  selector: 'app-validation.list',
  templateUrl: './validation.list.component.html',
  styleUrls: ['./validation.list.component.css']
})
export class ValidationListComponent implements OnInit {
  patientFields: PatientFields;
  isSuccuess: boolean = false;
  constructor(private patientRequiredFieldsService: PatientRequiredFieldsService) { }

  ngOnInit(): void {
    this.retrieveBaiscInfoRequiredFields();
  }
  changeBaiscInfoRequiredFields() {
    this.patientRequiredFieldsService.change(this.patientFields).subscribe(
      (response) => {
        this.isSuccuess = true
        setTimeout(() => {
          this.isSuccuess = false
        }, 2000);
      },
      (error) => {
        this.isSuccuess = false
        console.log(error);
      });
  }

  retrieveBaiscInfoRequiredFields() {
    this.patientRequiredFieldsService.retrieve().subscribe(patientFields => {
      var result: PatientFields = <PatientFields>patientFields;
      console.log(result)
      if (patientFields !== null) {
        this.patientFields = result;
      } else {
        this.patientFields = new PatientFields();
        this.patientFields.basicInfo = {
          id: 0,
          name: true,
          birthDate: true,
          gender: true,
          maritalStatus: true,
          phone: true,
          email: true,
          patientId: true,
          emergencyContact: true

        }
      }
    });
  }


}
