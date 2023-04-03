import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent implements OnInit {
  imageFormData: FormData = new FormData();
  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
  }

  public onImageUpload(event: any, photoType: string) {

    if (photoType === 'pIdfront') {
      var uploadedIDFrontImage: File = event.target.files[0];
      this.imageUploadAction(uploadedIDFrontImage, 'pIdfront')
    }

    if (photoType === 'pIdback') {
      var uploadedIDBackImage: File = event.target.files[0];
      this.imageUploadAction(uploadedIDBackImage, 'pIdback')
    }
    if (photoType === 'pinsurancefront') {
      var uploadedInsuranceFrontImage: File = event.target.files[0];
      this.imageUploadAction(uploadedInsuranceFrontImage, 'pinsurancefront')
    }
    if (photoType === 'pinsuranceback') {
      var uploadedInsuranceBackImage: File = event.target.files[0];
      this.imageUploadAction(uploadedInsuranceBackImage, 'pinsuranceback')
    }

  }
  imageUploadAction(uploadedImage: File, imageName: string) {
    this.imageFormData.append('files', uploadedImage, uploadedImage.name + ':' + imageName);
  }
}
