import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { Patient } from 'src/app/models/patient/patient.model';
import { LocalService } from 'src/app/modules/common';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  pateint: Patient
  constructor(private sanitizer: DomSanitizer , private localService:LocalService) { }

  ngOnInit(): void {
    if (this.localService.getData('patient') !== null) {
      this.pateint = JSON.parse(this.localService.getData('patient') || '{}')
    }
  }

  getSummary() {
    const paragraph = this.getPatientBaisInfo() + this.getPatientAddress() + this.getPatientMedicalInfo() + this.getPatientInsuranceInformation();
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);
  }

  getPatientBaisInfo() {
    const paragraph = `<u><h4 style="font-family:Lucida">Patient Basic Information</h4></u>
    <b style="font-family:Lucida">Name</b> : <i style="font-family:Lucida">${this.pateint.basicInfo.firstName} , ${this.pateint.basicInfo.middleName} , ${this.pateint.basicInfo.lastName} </i></br>
    <b style="font-family:Lucida">BirthDate </b> : <i >${moment(this.pateint.basicInfo.birthDate_date).format("MM/DD/YYYY")} </i><br/>
    <b style="font-family:Lucida">Gender</b> : <i >${this.pateint.basicInfo.gender} </i><br/>
    <b style="font-family:Lucida">Marital Status</b> : <i >${this.pateint.basicInfo.maritalStatus} </i><br/>
    <b style="font-family:Lucida">Phone Type</b> : <i >${this.pateint.basicInfo.phoneType} </i><br/>
    <b style="font-family:Lucida">Phone Number</b> : <i >${this.pateint.basicInfo.phoneNumber} </i><br/>
    <b style="font-family:Lucida">Email</b> : <i >${this.pateint.basicInfo.email} </i><br/>
    <bstyle="font-family:Lucida" >Id Type</b> : <i >${this.pateint.basicInfo.idType} </i> &#160 , 
    <b style="font-family:Lucida">Id</b> : <i >${this.pateint.basicInfo.patientId} </i> &#160 ,
    <b- style="font-family:Lucida">Id Effective From</b> : <i >${moment(this.pateint.basicInfo.id_effective_from_date).format("MM/DD/YYYY")} </i> &#160 ,
    <b style="font-family:Lucida">Id Effective To</b> : <i >${moment(this.pateint.basicInfo.id_effective_to_date).format("MM/DD/YYYY")} </i> <br/>
    <b style="font-family:Lucida">Emergency Name</b> : <i >${this.pateint.basicInfo.emergencyName} </i> <br/>
    <b style="font-family:Lucida">Emergency Phone</b> : <i > ${this.pateint.basicInfo.emergencyPhone} </i> <br/>
    <b style="font-family:Lucida">Employment Status</b> : <i >${this.pateint.basicInfo.employmentStatus} </i> <br/>`
    return paragraph;
  }

  getPatientAddress() {
    const paragraph = `<br/><u><h4 style="font-family:Lucida">Patient Address Information</h4></u>
    <b style="font-family:Lucida">Address Type</b> : <i style="font-family:Lucida"> ${this.pateint.addressInfo.type} </i></br>
    <b style="font-family:Lucida">First Address </b> : <i style="font-family:Lucida"> ${this.pateint.addressInfo.first} </i></br>
    <b style="font-family:Lucida">Second Address </b> : <i style="font-family:Lucida"> ${this.pateint.addressInfo.second} </i></br>
    <b style="font-family:Lucida">Country</b> : <i style="font-family:Lucida"> ${this.pateint.addressInfo.country} </i></br>
    <b style="font-family:Lucida">Zip-Code</b> : <i style="font-family:Lucida"> ${this.pateint.addressInfo.zipCode} </i></br>`
    return paragraph;
  }

  getPatientMedicalInfo() {
    var paragraph = `<br/><u><h4 style="font-family:Lucida">Patient Medical Information</h4></u>`
    if (this.pateint.medicalQuestionnaireInfo.isDoctorRecommended) {
      paragraph +=
        `<b style="font-family:Lucida">Recommendation Doctor Name</b> : <i style="font-family:Lucida"> ${this.pateint.medicalQuestionnaireInfo.recommendationDoctor?.name} </i></br>
      </i></br>
      <b style="font-family:Lucida">Recommendation Doctor Fax</b> : <i style="font-family:Lucida"> ${this.pateint.medicalQuestionnaireInfo.recommendationDoctor?.npi} </i></br>`
    } else {
      paragraph +=
        `<b style="font-family:Lucida">- Recommendation Entity</b> : <i style="font-family:Lucida"> ${this.pateint.medicalQuestionnaireInfo.recommendationEntity?.name} </i></br>`
    }
    paragraph +=
      `<b style="font-family:Lucida">- Booking Appointment</b> : <i style="font-family:Lucida"> ${this.pateint.medicalQuestionnaireInfo.appointmentBooking} </i></br>
    <b style="font-family:Lucida">- Primary Doctor</b> : <i style="font-family:Lucida"> ${this.pateint.medicalQuestionnaireInfo.primaryDoctor} </i></br>
    <b style="font-family:Lucida">- Would you like your results sent to your family doctor?</b> : <i style="font-family:Lucida"> ${this.pateint.medicalQuestionnaireInfo.familyResultSubmission ? 'Yes' : 'No'} </i></br>
    <b style="font-family:Lucida">- Have you received physical therapy this year somewhere else?</b> : <i style="font-family:Lucida"> ${this.pateint.medicalQuestionnaireInfo.physicalTherapy ? 'Yes' : 'No'} </i></br>`
    if (this.pateint.medicalQuestionnaireInfo.physicalTherapy) {
      paragraph += `
      &#160 &#160 <b style="font-family:Lucida">Location</b> : <i style="font-family:Lucida"> ${this.pateint.medicalQuestionnaireInfo.physicalTherapy.location} </i></br>
      &#160 &#160 <b style="font-family:Lucida">How many number of visits</b> : <i style="font-family:Lucida"> ${this.pateint.medicalQuestionnaireInfo.physicalTherapy.numberOfVisit} </i></br>`
    }
    paragraph += `
    <b style="font-family:Lucida">- Height</b> : <i style="font-family:Lucida"> ${this.pateint.medicalHistoryInformation.height} </i></br>
    <b style="font-family:Lucida">- weight</b> : <i style="font-family:Lucida"> ${this.pateint.medicalHistoryInformation.weight} </i></br>
    <b style="font-family:Lucida">- What is your primary reason for today’s evaluation </b> : <i style="font-family:Lucida"> ${this.pateint.medicalHistoryInformation.evaluationReason} </i></br>
    <b style="font-family:Lucida">- list any prescription or non-prescription medication you are taking </b> : <i style="font-family:Lucida"> ${this.pateint.medicalHistoryInformation.medicationPrescription} </i></br>
    <b style="font-family:Lucida">- Condition(s) that you have been told you have (or had) </b> : <i style="font-family:Lucida"> ${this.pateint.medicalHistoryInformation.patientCondition} </i></br>
    <b style="font-family:Lucida">- MRI, CT scan and X-Ray </b> : <i style="font-family:Lucida"> ${this.pateint.medicalHistoryInformation.scanningTest ? 'Yes' : 'No'} </i></br>`
    if (this.pateint.medicalHistoryInformation.scanningTest) {
      paragraph += `&#160 &#160 <i style="font-family:Lucida"> ${this.pateint.medicalHistoryInformation.scanningTestValue} </i></br>`
    }
    paragraph += `
    <b style="font-family:Lucida">pacemaker</b> : <i style="font-family:Lucida"> ${this.pateint.medicalHistoryInformation.pacemaker ? 'Yes' : 'No'} </i></br>
    <b style="font-family:Lucida">- Metal Implants</b> : <i style="font-family:Lucida"> ${this.pateint.medicalHistoryInformation.metalImplantation ? 'Yes' : 'No'} </i></br>
    <b style="font-family:Lucida">- list any Surgeries you may have had or any other conditions not listed above</b> : <i style="font-family:Lucida"> ${this.pateint.medicalHistoryInformation.surgeriesList} </i></br>`
    return paragraph;
  }

  getPatientInsuranceInformation() {
    var paragraph = `<br/><u><h4 style="font-family:Lucida">Patient Insurance Information</h4></u>
    <b style="font-family:Lucida">- Is it, worker's comp/No fault?</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.isCompNoFault ? 'Yes' : 'No'} </i></br>`
    if (this.pateint.insuranceQuestionnaireInfo.isCompNoFault) {
      paragraph += `
      <b style="font-family:Lucida">- Worker Related Injury/Auto-Accident</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.injuryType} </i></br>
      <b style="font-family:Lucida">- Accident Date</b> : <i style="font-family:Lucida"> ${moment(this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.accidentDate_date).format("MM/DD/YYYY")} </i></br>
      <b style="font-family:Lucida">- Worker Status</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.workerStatus} </i></br>
      <b style="font-family:Lucida">- Address</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.workerCompAddress.type} ,
      ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.workerCompAddress.first},
      ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.workerCompAddress.second},
      ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.workerCompAddress.country},
      ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.workerCompAddress.city},
      ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.workerCompAddress.zipCode} </i></br>
      <b style="font-family:Lucida">- Fax</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.fax} </i></br>
      <b style="font-family:Lucida">- Insurance Company Name</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.insuranceName} </i></br>
      <b style="font-family:Lucida">- Claim Number/ WC Case Number</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.claimNumber} </i></br>
      <b style="font-family:Lucida">- Adjuster Name</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.adjusterInfoName} </i></br>
      <b style="font-family:Lucida">- Adjuster Phone</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.adjusterInfoPhone} </i></br>
      <b style="font-family:Lucida">- Attorney Name</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.attorneyInfoName} </i></br>
      <b style="font-family:Lucida">- Attorney Phone</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.attorneyInfoPhone} </i></br>
      <b style="font-family:Lucida">- Case Status</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.caseStatus} </i></br>`
    } else {
      paragraph += `
      <b style="font-family:Lucida">- Insurance Company Name</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.insuranceCompanyId} </i></br>
      <b style="font-family:Lucida">- Member ID</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.memberId} </i></br>
      <b style="font-family:Lucida">- Policy ID</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.policyId} </i></br>
      <b style="font-family:Lucida">- Policyholders Relationship</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.relationship} </i></br>`
      if (this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.relationship !== 'Self') {
        paragraph += `
        <b style="font-family:Lucida">- Policy Holder’s First Name</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipFirstName} </i></br>
        <b style="font-family:Lucida">- Policy Holder’s Middle Name</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipMeddileName} </i></br>
        <b style="font-family:Lucida">- Policy Holder’s Last Name</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipLastName} </i></br>
        <b style="font-family:Lucida">- Policy Holder’s Phone</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipPhone} </i></br>
        <b style="font-family:Lucida">- Policy Holder’s Employer Name</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.patientRelationshipDTO?.employerName} </i></br>`
      }

      paragraph += `
      <b style="font-family:Lucida">- Do you have secondry insurance?</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.isSecondaryInsurance ? 'Yes' : 'No'} </i></br>`
      if(this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.isSecondaryInsurance){
        paragraph += `
        &#160 &#160 <b style="font-family:Lucida">- Policy Holder’s First Name</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.secondaryInsuranceDTO?.policyHolderFirstName} </i></br>
        &#160 &#160 <b style="font-family:Lucida">- Policy Holder’s Middle Name</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.secondaryInsuranceDTO?.policyHolderMeddileName} </i></br>
        &#160 &#160 <b style="font-family:Lucida">- Policy Holder’s Last Name</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.secondaryInsuranceDTO?.policyHolderLastName} </i></br>
        &#160 &#160 <b style="font-family:Lucida">- Insurance Company</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.secondaryInsuranceDTO?.insuranceCompany} </i></br>
        &#160 &#160 <b style="font-family:Lucida">- Member ID</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.secondaryInsuranceDTO?.memberId} </i></br>
        &#160 &#160 <b style="font-family:Lucida">- Member ID</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.secondaryInsuranceDTO?.memberId} </i></br>`
      }      
      paragraph += `
      <b style="font-family:Lucida">- Medicare Coverage?</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.isMedicareCoverage ? 'Yes' : 'No'} </i></br>`
      if(this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.isMedicareCoverage){
        paragraph += `
        &#160 &#160 <b style="font-family:Lucida">- Policy Holder’s Employer First Name</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.medicareCoverageDTO?.employerFirstName} </i></br>
        &#160 &#160 <b style="font-family:Lucida">- Policy Holder’s Employer Middle Name</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.medicareCoverageDTO?.employerMeddileName} </i></br>
        &#160 &#160 <b style="font-family:Lucida">- Policy Holder’s Employer Last Name</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.medicareCoverageDTO?.employerLastName} </i></br>
        &#160 &#160 <b style="font-family:Lucida">- Policy Holder’s Employer Phone</b> : <i style="font-family:Lucida"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.medicareCoverageDTO?.employerPhone} </i></br>`
      }
    }
    return paragraph;
  }
}
