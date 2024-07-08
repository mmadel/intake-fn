import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import SignaturePad from 'signature_pad';

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
  public panes = [
    { name: 'Generate Signature' },
    { name: 'Draw Signature' }
  ];
  @ViewChild('canvas') canvasEl!: ElementRef;
  constructor() { }
  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  ngOnInit(): void {
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
}
