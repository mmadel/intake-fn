import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { states } from 'src/app/modules/common/components/address/state-data-store';
import { LabelsService } from 'src/app/modules/common/services/labels/labels.service';
import { ValidationExploder } from '../create/validators/validation.exploder';

@Component({
  selector: 'patient-address',
  templateUrl: './patient-address.component.html',
  styleUrls: ['./patient-address.component.css']
})
export class PatientAddressComponent implements OnInit {
  @Input() form: FormGroup;
  states: string[] = states;
  @Input() stepper: MatStepper
  isValidForm: boolean = false;
  labels: any = {};
  constructor(private labelsService: LabelsService) { }

  ngOnInit(): void {
    this.labelsService.getLabels().subscribe(data => {
      this.labels = data;
    });
  }
  next() {
    if (this.form.get('address')?.valid) {
      this.stepper.next();
      this.isValidForm = false;
    } else {
      this.isValidForm = true;
      ValidationExploder.explode(this.form, 'address')
    }
  }

}
