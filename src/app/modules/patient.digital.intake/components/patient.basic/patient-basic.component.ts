import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ComponentReferenceComponentService } from '../../services/component.reference/component-reference-component.service';
import { CompressDocumentService } from '../../services/doument/compress-document.service';

@Component({
  selector: 'patient-basic',
  templateUrl: './patient-basic.component.html',
  styleUrls: ['./patient-basic.component.css']
})
export class PatientBasicComponent implements OnInit {
  fileMap: Map<string, File> = new Map();
  @Input() form: FormGroup;
  isGuarantor: boolean = false
  constructor(private componentReference: ComponentReferenceComponentService
    , private compressDocumentService: CompressDocumentService) { }

  ngOnInit(): void {
    this.componentReference.setPatientBasicComponent(this)
  }
  public checkAge(event: any) {
    var patientAge = moment().diff(event, 'y')
    this.isGuarantor = patientAge < 21 ? true : false;
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
}
