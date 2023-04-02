import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent implements OnInit {
  uploadedImage: File;
  constructor() { }

  ngOnInit(): void {
  }

  public onImageUpload(event:any) {
    this.uploadedImage = event.target.files[0];
    console.log(this.uploadedImage)
  }
  imageUploadAction(){
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
  }
}
