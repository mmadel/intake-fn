import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import html2canvas from 'html2canvas';
import SignaturePad from 'signature_pad';
import { PatientSignature } from 'src/app/modules/patient.questionnaire/models/patient/signature.model';
import { PatientSignatureService } from '../../services/signature/patient-signature.service';

@Component({
  selector: 'patient-signature',
  templateUrl: './patient-signature.component.html',
  styleUrls: ['./patient-signature.component.css']
})
export class PatientSignatureComponent implements OnInit,AfterViewInit {
  @Input() form: FormGroup;
  signatureType: number = 2;
  signatureNeeded: boolean = true;
  signaturePad!: SignaturePad;
  activePane = 0;
  signatureClass: string = "";
  signatureImg!: string;
  model: PatientSignature = new PatientSignature();
  @ViewChild('patientsig') patientsig: ElementRef;
  public panes = [
    { name: 'Generate Signature' },
    { name: 'Draw Signature' }
  ];
  @ViewChild('canvas') canvasEl!: ElementRef;
  constructor(private patientSignatureService:PatientSignatureService) { }
  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  ngOnInit(): void {
    this.patientSignatureService.setPatientSignatureComponent(this)
  }
  onTabChange($event: number) {
    this.signatureType = $event;
    this.activePane = $event;
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
  draw() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {
      this.signatureNeeded = false;
    }
    this.model.signature = this.signatureImg;
    console.log(this.signatureImg)
  }
  generate() {
    this.patientsig.nativeElement.name = 'patientsig'
    document.body.appendChild(this.patientsig.nativeElement);
    //var dd: HTMLElement = document.getElementById('sig')!;
  }
}
