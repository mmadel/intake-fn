import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { Patient } from 'src/app/models/patient/patient.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  pateint: Patient
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (localStorage.getItem('patient') !== null) {
      this.pateint = JSON.parse(localStorage.getItem('patient') || '{}')
    }
  }

  getSummary() {
    const paragraph = this.getPatientBaisInfo() + this.getPatientAddress() + this.getPatientMedicalInfo() + this.getPatientInsuranceInformation();
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);
  }

  getPatientBaisInfo() {
    const paragraph = `<u><h4 style="font-family:Cursive">Patient Basic Information</h4></u>
    <b style="font-family:Cursive">Name</b> : <i style="font-family:Cursive">${this.pateint.basicInfo.firstName} , ${this.pateint.basicInfo.middleName} , ${this.pateint.basicInfo.lastName} </i></br>
    <b style="font-family:Cursive">BirthDate </b> : <i >${moment(this.pateint.basicInfo.birthDate_date).format("MM/DD/YYYY")} </i><br/>
    <b style="font-family:Cursive">Gender</b> : <i >${this.pateint.basicInfo.gender} </i><br/>
    <b style="font-family:Cursive">Marital Status</b> : <i >${this.pateint.basicInfo.maritalStatus} </i><br/>
    <b style="font-family:Cursive">Phone Type</b> : <i >${this.pateint.basicInfo.phoneType} </i><br/>
    <b style="font-family:Cursive">Phone Number</b> : <i >${this.pateint.basicInfo.phoneNumber} </i><br/>
    <b style="font-family:Cursive">Email</b> : <i >${this.pateint.basicInfo.email} </i><br/>
    <bstyle="font-family:Cursive" >Id Type</b> : <i >${this.pateint.basicInfo.idType} </i> &#160 , 
    <b style="font-family:Cursive">Id</b> : <i >${this.pateint.basicInfo.patientId} </i> &#160 ,
    <b- style="font-family:Cursive">Id Effective From</b> : <i >${moment(this.pateint.basicInfo.id_effective_from_date).format("MM/DD/YYYY")} </i> &#160 ,
    <b style="font-family:Cursive">Id Effective To</b> : <i >${moment(this.pateint.basicInfo.id_effective_to_date).format("MM/DD/YYYY")} </i> <br/>
    <b style="font-family:Cursive">Emergency Name</b> : <i >${this.pateint.basicInfo.emergencyName} </i> <br/>
    <b style="font-family:Cursive">Emergency Phone</b> : <i > ${this.pateint.basicInfo.emergencyPhone} </i> <br/>
    <b style="font-family:Cursive">Employment Status</b> : <i >${this.pateint.basicInfo.employmentStatus} </i> <br/>`
    return paragraph;
  }

  getPatientAddress() {
    const paragraph = `<br/><u><h4 style="font-family:Cursive">Patient Address Information</h4></u>
    <b style="font-family:Cursive">Address Type</b> : <i style="font-family:Cursive"> ${this.pateint.addressInfo.type} </i></br>
    <b style="font-family:Cursive">First Address </b> : <i style="font-family:Cursive"> ${this.pateint.addressInfo.first} </i></br>
    <b style="font-family:Cursive">Second Address </b> : <i style="font-family:Cursive"> ${this.pateint.addressInfo.second} </i></br>
    <b style="font-family:Cursive">Country</b> : <i style="font-family:Cursive"> ${this.pateint.addressInfo.country} </i></br>
    <b style="font-family:Cursive">Zip-Code</b> : <i style="font-family:Cursive"> ${this.pateint.addressInfo.zipCode} </i></br>`
    return paragraph;
  }

  getPatientMedicalInfo() {
    var paragraph = `<br/><u><h4 style="font-family:Cursive">Patient Medical Information</h4></u>`
    if (this.pateint.medicalQuestionnaireInfo.isDoctorRecommended) {
      paragraph +=
        `<b style="font-family:Cursive">Recommendation Doctor Name</b> : <i style="font-family:Cursive"> ${this.pateint.medicalQuestionnaireInfo.recommendationDoctor?.name} </i></br>
      <b style="font-family:Cursive">Recommendation Doctor Address</b> : <i style="font-family:Cursive"> ${this.pateint.medicalQuestionnaireInfo.recommendationDoctor?.address} </i></br>
      <b style="font-family:Cursive">Recommendation Doctor Fax</b> : <i style="font-family:Cursive"> ${this.pateint.medicalQuestionnaireInfo.recommendationDoctor?.fax} </i></br>
      <b style="font-family:Cursive">Recommendation Doctor Fax</b> : <i style="font-family:Cursive"> ${this.pateint.medicalQuestionnaireInfo.recommendationDoctor?.npi} </i></br>`
    } else {
      paragraph +=
        `<b style="font-family:Cursive">- Recommendation Entity</b> : <i style="font-family:Cursive"> ${this.pateint.medicalQuestionnaireInfo.recommendationEntity?.name} </i></br>`
    }
    paragraph +=
      `<b style="font-family:Cursive">- Booking Appointment</b> : <i style="font-family:Cursive"> ${this.pateint.medicalQuestionnaireInfo.appointmentBooking} </i></br>
    <b style="font-family:Cursive">- Primary Doctor</b> : <i style="font-family:Cursive"> ${this.pateint.medicalQuestionnaireInfo.primaryDoctor} </i></br>
    <b style="font-family:Cursive">- Would you like your results sent to your family doctor?</b> : <i style="font-family:Cursive"> ${this.pateint.medicalQuestionnaireInfo.familyResultSubmission ? 'Yes' : 'No'} </i></br>
    <b style="font-family:Cursive">- Have you received physical therapy this year somewhere else?</b> : <i style="font-family:Cursive"> ${this.pateint.medicalQuestionnaireInfo.physicalTherapy ? 'Yes' : 'No'} </i></br>`
    if (this.pateint.medicalQuestionnaireInfo.physicalTherapy) {
      paragraph += `
      &#160 &#160 <b style="font-family:Cursive">Location</b> : <i style="font-family:Cursive"> ${this.pateint.medicalQuestionnaireInfo.physicalTherapy.location} </i></br>
      &#160 &#160 <b style="font-family:Cursive">How many number of visits</b> : <i style="font-family:Cursive"> ${this.pateint.medicalQuestionnaireInfo.physicalTherapy.numberOfVisit} </i></br>`
    }
    paragraph += `
    <b style="font-family:Cursive">- Height</b> : <i style="font-family:Cursive"> ${this.pateint.medicalHistoryInformation.height} </i></br>
    <b style="font-family:Cursive">- weight</b> : <i style="font-family:Cursive"> ${this.pateint.medicalHistoryInformation.weight} </i></br>
    <b style="font-family:Cursive">- What is your primary reason for today’s evaluation </b> : <i style="font-family:Cursive"> ${this.pateint.medicalHistoryInformation.evaluationReason} </i></br>
    <b style="font-family:Cursive">- list any prescription or non-prescription medication you are taking </b> : <i style="font-family:Cursive"> ${this.pateint.medicalHistoryInformation.medicationPrescription} </i></br>
    <b style="font-family:Cursive">- Condition(s) that you have been told you have (or had) </b> : <i style="font-family:Cursive"> ${this.pateint.medicalHistoryInformation.patientCondition} </i></br>
    <b style="font-family:Cursive">- MRI, CT scan and X-Ray </b> : <i style="font-family:Cursive"> ${this.pateint.medicalHistoryInformation.scanningTest ? 'Yes' : 'No'} </i></br>`
    if (this.pateint.medicalHistoryInformation.scanningTest) {
      paragraph += `&#160 &#160 <i style="font-family:Cursive"> ${this.pateint.medicalHistoryInformation.scanningTestValue} </i></br>`
    }
    paragraph += `
    <b style="font-family:Cursive">pacemaker</b> : <i style="font-family:Cursive"> ${this.pateint.medicalHistoryInformation.pacemaker ? 'Yes' : 'No'} </i></br>
    <b style="font-family:Cursive">- Metal Implants</b> : <i style="font-family:Cursive"> ${this.pateint.medicalHistoryInformation.metalImplantation ? 'Yes' : 'No'} </i></br>
    <b style="font-family:Cursive">- list any Surgeries you may have had or any other conditions not listed above</b> : <i style="font-family:Cursive"> ${this.pateint.medicalHistoryInformation.surgeriesList} </i></br>`
    return paragraph;
  }

  getPatientInsuranceInformation() {
    var paragraph = `<br/><u><h4 style="font-family:Cursive">Patient Insurance Information</h4></u>
    <b style="font-family:Cursive">- Is it, worker's comp/No fault?</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.isCompNoFault ? 'Yes' : 'No'} </i></br>`
    if (this.pateint.insuranceQuestionnaireInfo.isCompNoFault) {
      paragraph += `
      <b style="font-family:Cursive">- Worker Related Injury/Auto-Accident</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.injuryType} </i></br>
      <b style="font-family:Cursive">- Accident Date</b> : <i style="font-family:Cursive"> ${moment(this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.accidentDate_date).format("MM/DD/YYYY")} </i></br>
      <b style="font-family:Cursive">- Worker Status</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.workerStatus} </i></br>
      <b style="font-family:Cursive">- Address</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.address} </i></br>
      <b style="font-family:Cursive">- Fax</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.fax} </i></br>
      <b style="font-family:Cursive">- Insurance Company Name</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.insuranceName} </i></br>
      <b style="font-family:Cursive">- Claim Number/ WC Case Number</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.claimNumber} </i></br>
      <b style="font-family:Cursive">- Adjuster Name</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.adjusterInfoName} </i></br>
      <b style="font-family:Cursive">- Adjuster Phone</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.adjusterInfoPhone} </i></br>
      <b style="font-family:Cursive">- Attorney Name</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.attorneyInfoName} </i></br>
      <b style="font-family:Cursive">- Attorney Phone</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.attorneyInfoPhone} </i></br>
      <b style="font-family:Cursive">- Case Status</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault?.caseStatus} </i></br>`
    } else {
      paragraph += `
      <b style="font-family:Cursive">- Insurance Company Name</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.insuranceCompanyId} </i></br>
      <b style="font-family:Cursive">- Member ID</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.memberId} </i></br>
      <b style="font-family:Cursive">- Policy ID</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.policyId} </i></br>
      <b style="font-family:Cursive">- Policyholders Relationship</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.relationship} </i></br>`
      if (this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.relationship !== 'Self') {
        paragraph += `
        <b style="font-family:Cursive">- Policy Holder’s First Name</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipFirstName} </i></br>
        <b style="font-family:Cursive">- Policy Holder’s Middle Name</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipMeddileName} </i></br>
        <b style="font-family:Cursive">- Policy Holder’s Last Name</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipLastName} </i></br>
        <b style="font-family:Cursive">- Policy Holder’s Phone</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipPhone} </i></br>
        <b style="font-family:Cursive">- Policy Holder’s Employer Name</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.patientRelationshipDTO?.employerName} </i></br>`
      }

      paragraph += `
      <b style="font-family:Cursive">- Do you have secondry insurance?</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.isSecondaryInsurance ? 'Yes' : 'No'} </i></br>`
      if(this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.isSecondaryInsurance){
        paragraph += `
        &#160 &#160 <b style="font-family:Cursive">- Policy Holder’s First Name</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.secondaryInsuranceDTO?.policyHolderFirstName} </i></br>
        &#160 &#160 <b style="font-family:Cursive">- Policy Holder’s Middle Name</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.secondaryInsuranceDTO?.policyHolderMeddileName} </i></br>
        &#160 &#160 <b style="font-family:Cursive">- Policy Holder’s Last Name</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.secondaryInsuranceDTO?.policyHolderLastName} </i></br>
        &#160 &#160 <b style="font-family:Cursive">- Insurance Company</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.secondaryInsuranceDTO?.insuranceCompany} </i></br>
        &#160 &#160 <b style="font-family:Cursive">- Member ID</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.secondaryInsuranceDTO?.memberId} </i></br>
        &#160 &#160 <b style="font-family:Cursive">- Member ID</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.secondaryInsuranceDTO?.memberId} </i></br>`
      }      
      paragraph += `
      <b style="font-family:Cursive">- Medicare Coverage?</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.isMedicareCoverage ? 'Yes' : 'No'} </i></br>`
      if(this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.isMedicareCoverage){
        paragraph += `
        &#160 &#160 <b style="font-family:Cursive">- Policy Holder’s Employer First Name</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.medicareCoverageDTO?.employerFirstName} </i></br>
        &#160 &#160 <b style="font-family:Cursive">- Policy Holder’s Employer Middle Name</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.medicareCoverageDTO?.employerMeddileName} </i></br>
        &#160 &#160 <b style="font-family:Cursive">- Policy Holder’s Employer Last Name</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.medicareCoverageDTO?.employerLastName} </i></br>
        &#160 &#160 <b style="font-family:Cursive">- Policy Holder’s Employer Phone</b> : <i style="font-family:Cursive"> ${this.pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial?.medicareCoverageDTO?.employerPhone} </i></br>`
      }
    }
    return paragraph;
  }
}
