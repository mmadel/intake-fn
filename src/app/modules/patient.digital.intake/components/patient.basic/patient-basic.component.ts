import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import * as moment from 'moment';
import { tap } from 'rxjs';
import { ComponentReferenceComponentService } from '../../services/component.reference/component-reference-component.service';
import { CompressDocumentService } from '../../services/doument/compress-document.service';
import { ValidationExploder } from '../create/validators/validation.exploder';

@Component({
  selector: 'patient-basic',
  templateUrl: './patient-basic.component.html',
  styleUrls: ['./patient-basic.component.css']
})
export class PatientBasicComponent implements OnInit {
  fileMap: Map<string, File> = new Map();
  @Input() form: FormGroup;
  @Input() stepper: MatStepper
  isValidForm: boolean = false;
  isGuarantor: boolean = false
  constructor(private componentReference: ComponentReferenceComponentService
    , private compressDocumentService: CompressDocumentService
  ) { }

  ngOnInit(): void {
    this.componentReference.setPatientBasicComponent(this)
    this.form.get('basic')?.get('dob')?.valueChanges.subscribe(value => {
      const today = moment(value).isSame(moment(), 'day');
      if (today) {
        this.isGuarantor = false;
        return false
      }
      const future = moment(value).isAfter(moment(), 'day');
      if (future) {
        this.isGuarantor = false;
        return false
      }
      var patientAge = moment().diff(value, 'y')
      this.isGuarantor = patientAge < 18 ? true : false;
    })
  }
  public checkAge(event: any) {
    const today = moment(event).isSame(moment(), 'day');
    if (today)
      return false
    var patientAge = moment().diff(event, 'y')
    this.isGuarantor = patientAge < 18 ? true : false;
  }
  public onImageUpload(event: any, photoType: string) {
    this.compressDocumentService.setuploadedImages(this.fileMap);
    this.compressDocumentService.onImageUpload(event, photoType)
  }
  public getFormDate() {
    var imageFormData = new FormData();
    for (const [key, value] of this.fileMap) {
      imageFormData.append('files', value, key);
    }
    return imageFormData;
  }
  next() {
    if (this.form.get('basic')?.valid) {
      this.stepper.next();
      this.isValidForm = false;
    } else {
      this.isValidForm = true;
      ValidationExploder.explode(this.form, 'basic')
    }
  }

}

