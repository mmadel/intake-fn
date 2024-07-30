import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import html2canvas from 'html2canvas';
import * as moment from 'moment';
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
  @Input() stepper: MatStepper
  isValidForm: boolean = false;
  @Input() form: FormGroup;
  signatureType: number = 2;
  signaturePad!: SignaturePad;
  activePane = 0;
  signatureClass: string = "";
  signatureImg!: string;
  patientFullName: string | undefined
  isDrawsign: boolean | undefined = undefined;
  isGeneratesign: boolean | undefined = undefined


  @ViewChild('patientsig') patientsig: ElementRef;
  public panes = [
    { name: 'Generate Signature' },
    { name: 'Draw Signature' }
  ];
  @ViewChild('canvas') canvasEl!: ElementRef;
  constructor(private patientSignatureService: PatientSignatureService, private renderer: Renderer2
    , private componentReference: ComponentReferenceComponentService) { }
  ngAfterViewInit(): void {
    this.componentReference.getPatientBasicComponent()?.form.get('basic')?.get('dob')?.valueChanges.subscribe(value => {
      console.log(value)
      var isGuarantor: boolean;
      this.componentReference.getPatientBasicComponent()!.isGuarantor
      var patientAge = moment().diff(value, 'y')
      isGuarantor = patientAge < 18 ? true : false;
      if (isGuarantor) {
        console.log('PatientSignature isGuarantor');
        var fName: string = this.componentReference.getPatientBasicComponent()?.form.get('basic')?.get('guarantorFirstName')?.value;
        var lName: string = this.componentReference.getPatientBasicComponent()?.form.get('basic')?.get('guarantorLastName')?.value;
        this.patientFullName = lName + ' ' + fName

      } else {
        console.log('PatientSignature not Guarantor');
        var fName: string = this.componentReference.getPatientBasicComponent()?.form.get('basic')?.get('firstname')?.value;
        var lName: string = this.componentReference.getPatientBasicComponent()?.form.get('basic')?.get('lastName')?.value;
        this.patientFullName = lName + ' ' + fName
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
    if (this.isGeneratesign === undefined && this.isDrawsign === undefined) {
      this.isValidForm = true;
      return;
    }

    if ((!this.isGeneratesign) || (!this.isDrawsign)) {
      this.stepper.next();
      this.isValidForm = false;
    }
    else
      this.isValidForm = true;
  }
  touchStopDrawing() {
    this.form.get('signature')?.get('drawsign')?.setValue(this.signaturePad.toDataURL())
    this.isDrawsign = true;
    this.isGeneratesign = false
  }
}
