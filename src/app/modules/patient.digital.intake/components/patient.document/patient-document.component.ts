import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { BehaviorSubject } from 'rxjs';
import { CompressDocumentService } from '../../services/doument/compress-document.service';
import { PatientDocumentService } from '../../services/doument/patient-document.service';

@Component({
  selector: 'patient-document',
  templateUrl: './patient-document.component.html',
  styleUrls: ['./patient-document.component.css']
})
export class PatientDocumentComponent implements OnInit {
  
  fileMap: Map<string, File> = new Map();
  @Input() form: FormGroup;
  constructor(private patientDocumentService: PatientDocumentService
    , private compressDocumentService: CompressDocumentService) { }

  ngOnInit(): void {
    this.patientDocumentService.setPatientDocumentComponent(this)
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
