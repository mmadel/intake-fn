import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { PatientSignature } from '../../models/patient/signature.model';
import { PatientService } from '../../service/patient.service';
@Component({
  selector: 'app-patientsignature',
  templateUrl: './patientsignature.component.html',
  styleUrls: ['./patientsignature.component.css']
})
export class PatientsignatureComponent implements OnInit {
  signatureNeeded: boolean = true;
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;
  signatureImgTest: string | undefined = undefined;
  model: PatientSignature = new PatientSignature();
  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }
  startDrawing(event: Event) {
    // works in device not in browser
  }

  moved(event: Event) {
    // works in device not in browser
  }
  clearPad() {
    this.signatureNeeded = true;
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {
      this.signatureNeeded = false;
    }
    console.log(this.signatureNeeded)
    this.model.signature = this.signatureImg;
  }

  show() {
    this.patientService.getPatientSignature(4).subscribe(response => {
      if (response.body !== null) {
        this.signatureImgTest = 'data:image/png;base64,' + response.body.signature
      }
    })
  }

}
