import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import html2canvas from 'html2canvas';
import { result } from 'lodash';
import * as moment from 'moment';
import { combineLatest, map, Observable, tap } from 'rxjs';

import SignaturePad from 'signature_pad';
import { ComponentReferenceComponentService } from '../../services/component.reference/component-reference-component.service';
import { PatientSignatureService } from '../../services/signature/patient-signature.service';

@Component({
  selector: 'patient-signature',
  templateUrl: './patient-signature.component.html',
  styleUrls: ['./patient-signature.component.css']
})
export class PatientSignatureComponent implements OnInit, AfterViewInit {
  @Input() stepper: MatStepper
  isValidForm: boolean = true;
  @Input() form: FormGroup;
  signatureType: number = 2;
  signaturePad!: SignaturePad;
  activePane = 0;
  signatureClass: string = "";
  signatureImg!: string;
  patientFullName: string | undefined
  gPatientFullName: string | undefined
  isDrawsign: boolean | undefined = false;
  isGeneratesign: boolean | undefined = false


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
    ]).subscribe((pName: any) => {
      this.patientFullName = pName[1] + ' ' + pName[0]
    })

    this.componentReference.getPatientBasicComponent()?.form.get('basic')?.get('dob')!.valueChanges.subscribe(dob => {
      var isGuarantor: boolean;
      var patientAge = moment().diff(dob, 'y')
      isGuarantor = patientAge < 18 ? true : false;
      console.log(isGuarantor)
      if (isGuarantor)
        combineLatest([
          this.componentReference.getPatientBasicComponent()?.form.get('basic')?.get('guarantorFirstName')?.valueChanges,
          this.componentReference.getPatientBasicComponent()?.form.get('basic')?.get('guarantorLastName')?.valueChanges
        ]).subscribe((pName: any) => {
          this.gPatientFullName = pName[1] + ' ' + pName[0]
        })
      else {
        this.gPatientFullName = undefined
        combineLatest([
          this.componentReference.getPatientBasicComponent()?.form.get('basic')?.get('firstname')?.valueChanges,
          this.componentReference.getPatientBasicComponent()?.form.get('basic')?.get('lastName')?.valueChanges
        ]).subscribe((pName: any) => {
          this.patientFullName = pName[1] + ' ' + pName[0]
        })
      }

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
    this.isDrawsign = false;
    this.signaturePad.clear();
    this.form.get('signature')?.get('drawsign')?.setValue(null)
  }

  stopDrawing() {
    this.form.get('signature')?.get('drawsign')?.setValue(this.signaturePad.toDataURL())
    this.isDrawsign = true;
    this.isGeneratesign = false
  }
  generatesign(event: any) {
    this.patientsig.nativeElement.name = 'patientsig'
    this.renderer.setAttribute(this.patientsig.nativeElement, 'class', event.target.value);
    html2canvas(this.patientsig.nativeElement).then(canvas => {
      this.form.get('signature')?.get('generatesign')?.setValue(canvas.toDataURL())
    });;
    this.isGeneratesign = true
    this.isDrawsign = false;
  }

  next() {
    var drawSign: string = this.form.get('signature')?.get('drawsign')?.value
    this.isDrawsign = false;
    if (!this.signaturePad.isEmpty())
      this.isDrawsign = true
    if (this.isGeneratesign || this.isDrawsign) {
      this.stepper.next();
      this.isValidForm = true;
    }
    else
      this.isValidForm = false;
  }
  touchStopDrawing() {
    this.form.get('signature')?.get('drawsign')?.setValue(this.signaturePad.toDataURL())
    this.isDrawsign = true;
    this.isGeneratesign = false
  }
}
