import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { AgreementHolder } from 'src/app/models/patient/agreements/agreements.holder';
import { Agreements } from 'src/app/models/patient/agreements/agreements.model';
import { Patient } from 'src/app/models/patient/patient.model';
import { LocalService } from 'src/app/modules/common';
import { PatientService } from '../../service/patient.service';
@Component({
  selector: 'app-aggreements',
  templateUrl: './aggreements.component.html',
  styleUrls: ['./aggreements.component.css']
})
export class AggreementsComponent implements OnInit {
  releaseInformationParagraph: string | null;
  FinancialResponsibilityParagraph: string | null;
  FinancialAgreementParagraph: string | null;
  InsuranceAgreementParagraph: string | null;
  HIPAAAcknowledgementParagraph: string | null;
  CuppingParagraph: string | null;
  PelvicParagraph: string | null;
  PhotoVideoParagraph: string | null;
  agreementHolder: AgreementHolder[] | null;
  patientName: string = ''
  model: Agreements
  nowDate = moment().format("MM.DD.YYYY");
  constructor(private sanitizer: DomSanitizer
    , private localService: LocalService,
    private patientService: PatientService) { }

  ngOnInit(): void {
    if (this.localService.getData('patient') !== null) {
      var pateint: Patient = JSON.parse(this.localService.getData('patient') || '{}')
      this.constructorPatientName(pateint);
      if (pateint.agreements !== undefined) {
        this.model = pateint.agreements;
      } else {
        this.model = new Agreements();
      }
    } else {
      this.model = new Agreements();
    }
    this.patientService.getAgreement().subscribe(response => {
      this.agreementHolder = response.body
      this.agreementHolder?.forEach(element => {
        if (element.agreementName === 'ReleaseInformation')
          this.releaseInformationParagraph = element.agreementText;
        if (element.agreementName === 'FinancialResponsibility')
          this.FinancialResponsibilityParagraph = element.agreementText;
        if (element.agreementName === 'FinancialAgreement')
          this.FinancialAgreementParagraph = element.agreementText;
        if (element.agreementName === 'Insurance')
          this.InsuranceAgreementParagraph = element.agreementText;
        if (element.agreementName === 'HIPAAAcknowledgement')
          this.HIPAAAcknowledgementParagraph = element.agreementText;
        if (element.agreementName === 'Cupping')
          this.CuppingParagraph = element.agreementText;
        if (element.agreementName === 'Pelvic')
          this.PelvicParagraph = element.agreementText;
        if (element.agreementName === 'PhotoVideo')
          this.PhotoVideoParagraph = element.agreementText;

      });

    })
  }
  getReleaseInformationParagraph() {
    const paragraph = `<p style="font-family:Lucida Handwriting">${this.releaseInformationParagraph}</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph)
  }
  getFinancialResponsibility() {
    const paragraph = `<p style="font-family:Lucida Handwriting">
    ${this.FinancialResponsibilityParagraph}.</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph)
  }

  getFinancialAgreement() {
    const paragraph = `<p style="font-family:Lucida Handwriting">
    ${this.FinancialAgreementParagraph}</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph)
  }

  getInsurance() {
    const paragraph = `<p style="font-family:Lucida Handwriting">
    ${this.InsuranceAgreementParagraph}.</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);
  }

  constructorPatientName(pateint: Patient) {
    var fName = pateint.basicInfo.firstName.charAt(0).toUpperCase() + pateint.basicInfo.firstName.slice(1);
    var mName = pateint.basicInfo.middleName.charAt(0).toUpperCase();
    var lName = pateint.basicInfo.lastName.charAt(0).toUpperCase() + pateint.basicInfo.lastName.slice(1);
    this.patientName = fName + ',' + mName + '.,' + lName
  }
  getHIPAAAcknowledgement() {
    const paragraph = `<p style="font-family:Lucida Handwriting">
    ${this.HIPAAAcknowledgementParagraph}Signature of Patient or Legal Representative:&#160;<b>${this.patientName}</b> &#160;Date: ${this.nowDate} </p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);

  }

  getCupping() {
    const paragraph = `<p style="font-family:Lucida Handwriting">
    ${this.CuppingParagraph}<p style="font-family:Lucida Handwriting">Patient/Guardian Name:&#160; <b>${this.patientName}</b> &#160; Date ${this.nowDate}<br/> Signature of Patient/Guardian:&#160; <b>${this.patientName}</b> &#160; Date ${this.nowDate}</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);
  }

  getPelvic() {
    const paragraph = `<p style="font-family:Lucida Handwriting">
    ${this.PelvicParagraph}Patient Name: &#160; <b>${this.patientName}</b><br/>Patient Signature: &#160; <b>${this.patientName}</b> &#160;Date :${this.nowDate}</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);
  }

  getPhotoVideo() {
    const paragraph = `<p style="font-family:Lucida Handwriting">I,<b>${this.patientName}</b><br/>  ${this.PhotoVideoParagraph}
    I acknowledge that I am <b>${this.patientName}</b>  over the age of 18 <br/><br/>Date: ${this.nowDate}      signature:<b>${this.patientName}</b></p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);
  }
}
