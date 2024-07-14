import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ComponentReferenceComponentService } from '../../services/component.reference/component-reference-component.service';
import { CompressDocumentService } from '../../services/doument/compress-document.service';

@Component({
  selector: 'patient-document',
  templateUrl: './patient-document.component.html',
  styleUrls: ['./patient-document.component.css']
})
export class PatientDocumentComponent implements OnInit {
  
  fileMap: Map<string, File> = new Map();
  isGuarantor:boolean = false
  @Input() form: FormGroup;
  constructor(private componentReference: ComponentReferenceComponentService
    , private compressDocumentService: CompressDocumentService) { }

  ngOnInit(): void {
    this.componentReference.setPatientDocumentComponent(this)
    this.componentReference.getPatientBasicComponent()?.form.get('basic')?.get('dob')?.valueChanges.subscribe(value=>{
        this.isGuarantor = this.componentReference.getPatientBasicComponent()!.isGuarantor
    })
  }
  public onImageUpload(event: any, photoType: string) {
    this.compressDocumentService.setuploadedImages(this.fileMap);
    this.compressDocumentService.onImageUpload(event, photoType)
  }
  public getFormDate() {
    this.clearfilMap();
    var imageFormData = new FormData();
    for (const [key, value] of this.fileMap) {
      imageFormData.append('files', value, key);
    }
    return imageFormData;
  }
  private  clearfilMap(){
    if(this.isGuarantor){
      this.fileMap.delete('patientIdfront')
      this.fileMap.delete('patientIdback')
      this.fileMap.delete('patientinsurancefront')
      this.fileMap.delete('patientinsuranceback')
    }else{
      this.fileMap.delete('guarantorIdfront')
      this.fileMap.delete('guarantorIdback')
    }
  }
}
