import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AgreementHolder } from 'src/app/models/patient/agreements/agreements.holder';
import { PatientService } from 'src/app/modules/patient.questionnaire/service/patient.service';

@Component({
  selector: 'patient-agreement',
  templateUrl: './patient-agreement.component.html',
  styleUrls: ['./patient-agreement.component.css']
})
export class PatientAgreementComponent implements OnInit {
  @Input() form: FormGroup;
  agreementHolder: AgreementHolder[] | null;
  releaseInformationParagraph: string | null;
  FinancialResponsibilityParagraph: string | null;
  FinancialAgreementParagraph: string | null;
  InsuranceAgreementParagraph: string | null;
  HIPAAAcknowledgementParagraph: string | null;
  CuppingParagraph: string | null;
  PelvicParagraph: string | null;
  PhotoVideoParagraph: string | null;
  constructor(private patientService: PatientService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getAgreements();
  }
  private getAgreements() {
    this.patientService.getAgreement().subscribe(response => {
      this.agreementHolder = response.body
      this.agreementHolder?.forEach(element => {
        this.fillAggrement(element);
      });
    })
  }
  private fillAggrement(element: AgreementHolder) {
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
  }
  getReleaseInformationParagraph() {
    const paragraph = `<p style="font-family:Lucida ">${this.releaseInformationParagraph}</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph)
  }
  getFinancialResponsibility() {
    const paragraph = `<p style="font-family:Lucida">
    ${this.FinancialResponsibilityParagraph}.</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph)
  }

  getFinancialAgreement() {
    const paragraph = `<p style="font-family:Lucida">
    ${this.FinancialAgreementParagraph}</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph)
  }

  getInsurance() {
    const paragraph = `<p style="font-family:Lucida ">
    ${this.InsuranceAgreementParagraph}.</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);
  }


  getHIPAAAcknowledgement() {
    const paragraph = `<p style="font-family:Lucida ">
    ${this.HIPAAAcknowledgementParagraph}</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);

  }

  getCupping() {
    const paragraph = `<p style="font-family:Lucida ">
    ${this.CuppingParagraph}<p style="font-family:Lucida "></p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);
  }

  getPelvic() {
    const paragraph = `<p style="font-family:Lucida">
    ${this.PelvicParagraph}</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);
  }
  getPhotoVideo() {
    const paragraph = `${this.PhotoVideoParagraph}</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);
  }

}
