import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import html2canvas from 'html2canvas';
import { combineLatest, Observable } from 'rxjs';

import SignaturePad from 'signature_pad';
import { ComponentReferenceComponentService } from '../../services/component.reference/component-reference-component.service';
import { PatientSignatureService } from '../../services/signature/patient-signature.service';

@Component({
  selector: 'patient-signature',
  templateUrl: './patient-signature.component.html',
  styleUrls: ['./patient-signature.component.css']
})
export class PatientSignatureComponent implements OnInit, AfterViewInit {
  @Input() form: FormGroup;
  signatureType: number = 2;
  signatureNeeded: boolean = true;
  signaturePad!: SignaturePad;
  activePane = 0;
  signatureClass: string = "";
  signatureImg!: string;
  patientFullName: string | undefined

  @ViewChild('patientsig') patientsig: ElementRef;
  public panes = [
    { name: 'Generate Signature' },
    { name: 'Draw Signature' }
  ];
  @ViewChild('canvas') canvasEl!: ElementRef;
  constructor(private patientSignatureService: PatientSignatureService, private renderer: Renderer2
    , private componentReference: ComponentReferenceComponentService) { }
  ngAfterViewInit(): void {

    combineLatest([
      this.componentReference.getPatientBasicComponent()?.form.get('basic')?.get('firstname')?.valueChanges,
      this.componentReference.getPatientBasicComponent()?.form.get('basic')?.get('lastName')?.valueChanges
    ]).subscribe((pName:any) => {
      this.patientFullName = pName[1] + ' ' + pName[0]
    })

    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  ngOnInit(): void {
    this.patientSignatureService.setPatientSignatureComponent(this)

  }
  onTabChange($event: number) {
    this.signatureType = $event;
    this.activePane = $event;
  }

  clearPad() {
    this.signatureNeeded = true;
    this.signaturePad.clear();
    this.form.get('signature')?.get('drawsign')?.setValue(null)
  }

  stopDrawing() {
    this.form.get('signature')?.get('drawsign')?.setValue(this.signaturePad.toDataURL())
  }
  generatesign(event: any) {
    this.patientsig.nativeElement.name = 'patientsig'
    this.renderer.setAttribute(this.patientsig.nativeElement, 'class', event.target.value);
    html2canvas(this.patientsig.nativeElement).then(canvas => {
      this.form.get('signature')?.get('generatesign')?.setValue(canvas.toDataURL())
    });;
  }
  isNotValid() {

  }
}
