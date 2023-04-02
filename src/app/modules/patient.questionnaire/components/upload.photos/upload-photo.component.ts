import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent implements OnInit {
  uploadedImage: File;
  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
  }

  public onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    console.log(this.uploadedImage)
  }
  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
    this.patientService.upload(imageFormData).subscribe(
      (response) => {
        console.log('uploaded..!!')
      },
      (error) => { console.log(error); });
  }
}
