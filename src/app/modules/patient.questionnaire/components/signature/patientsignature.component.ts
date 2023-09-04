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
  signatureNeeded!: boolean;
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;
  signatureImgTest: string | undefined = undefined;
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
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {
      this.signatureNeeded = false;
    }
    var model: PatientSignature = new PatientSignature();
    model.signature = this.signatureImg;
    model.patientId = '1230330'
    this.patientService.test(model).subscribe(response => {

    })
  }

  show() {
    this.patientService.getE().subscribe(response => {
      if (response.body !== null) {
        this.signatureImgTest = 'data:image/png;base64,' + response.body.signature
      }
    })
  }

}
