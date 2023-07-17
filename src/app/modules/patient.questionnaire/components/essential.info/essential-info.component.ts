import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Basic } from 'src/app/models/patient/basic.info.model';
import { Patient } from 'src/app/models/patient/patient.model';
import { BasicInfoRequired } from 'src/app/models/validation/basic.info';
import { LocalService } from 'src/app/modules/common';
import { EmergencyRelation } from '../../models/patient/emergency.relation';
@Component({
  selector: 'app-essential-info',
  templateUrl: './essential-info.component.html',
  styleUrls: ['./essential-info.component.css']
})
export class EssentialInfoComponent implements OnInit {
  pateintBasicInfo: Basic = new Basic()
  emergencyRelations: string[] = [];
  isPatientUnderage: boolean = false;
  guarantorRelationship: string[] = [];
  imageFormData: FormData = new FormData();
  @Input() requiredFields: BasicInfoRequired;
  constructor(private localService: LocalService, private imageCompress: NgxImageCompressService) { }

  ngOnInit(): void {
    this.fillEmergenctrelation();

    if (this.localService.getData('patient') !== null) {
      var pateint: Patient = JSON.parse(this.localService.getData('patient') || '{}')
      if (pateint.basicInfo !== undefined) {
        this.pateintBasicInfo = pateint.basicInfo;
      } else {
        this.pateintBasicInfo = new Basic();
      }
    } else {
      this.pateintBasicInfo = new Basic();
    }
  }
  isRequiredField(name: string): boolean {
    var field: boolean = false;
    Object.entries(this.requiredFields)
      .forEach(([key, value]) => {
        if (key === name) {
          field = value;
        }
      })
    return field;
  }
  fillEmergenctrelation() {
    for (var relation in EmergencyRelation) {
      this.emergencyRelations.push(relation)
      this.guarantorRelationship.push(relation)
    }
  }
  checkAge(event: any) {
    var patientAge = moment().diff(event, 'y')
    this.isPatientUnderage = patientAge < 18 ? true : false;
  }
  public onImageUpload(event: any, photoType: string) {
    
      var uploadedIDFrontImage: File = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        var localUrl = event.target.result;
        this.compressFile(localUrl, uploadedIDFrontImage['name'], photoType)

      }
      reader.readAsDataURL(uploadedIDFrontImage);
    
  }
  compressFile(image: any, fileName: any, fileSuffix: string) {
    var orientation = -1;
    var sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    console.warn('Size in bytes is now:', sizeOfOriginalImage);
    this.imageCompress.compressFile(image, orientation, 50, 50).then(
      result => {
        var imgResultAfterCompress = result;
        var sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024)
        console.warn('Size in bytes after compression:', sizeOFCompressedImage);
        // create file from byte
        const imageName = fileName;
        // call method that creates a blob from dataUri
        const imageBlob = this.dataURItoBlob(imgResultAfterCompress.split(',')[1]);
        //imageFile created below is the new compressed file which can be send to API in form data
        const imageFile = new File([imageBlob], imageName, {
          type: 'image/jpeg'
        });
        this.imageUploadAction(imageFile, fileSuffix);
      });
  }
  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], {
      type: 'image/jpeg'
    });
    return blob;
  }
  imageUploadAction(uploadedImage: File, imageName: string) {
    this.imageFormData.append('files', uploadedImage, uploadedImage.name + ':' + imageName);
  }
}
