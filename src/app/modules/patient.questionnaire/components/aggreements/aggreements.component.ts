import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-aggreements',
  templateUrl: './aggreements.component.html',
  styleUrls: ['./aggreements.component.css']
})
export class AggreementsComponent implements OnInit {
  patientName: string = 'mohamed Adel '
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }
  getReleaseInformationParagraph() {
    const paragraph = `<p style="font-family:Lucida Handwriting">
    I hereby authorize Hearing Health to release any medical information about the patient necessary to 
    determine liability for payment and to process any claim for examination, treatment or devices received 
    by the patient. I also authorize Hearing Health to release the medical records of the patient to the 
    patient’s referring physician or family physician indicated on the first page of this form.</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph)
  }
  getFinancialResponsibility() {
    const paragraph = `<p style="font-family:Lucida Handwriting">
    I agree to accept financial responsibility for the good and services rendered to the patient and to 
    accept the terms of the Financial Agreement , Assignment of Benefit , and Release of Information 
    provisions above.</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph)
  }

  getFinancialAgreement() {
    const paragraph = `<p style="font-family:Lucida Handwriting">
    We participate in many different insurance plans . We will file your insurance claims for the companies 
with whom we are contracted. You will be responsible for any co-payments or deductibles at the time 
services are rendered. For some insurance we accept assignment of benefits but in all cases, we require
that the guarantor, the person who is financially responsible , is personally liable for all balances not 
covered by insurance. It is our responsibility to understand and comply with any predetermination of 
benefits or referral requirements. Please be aware that some, and perhaps all , of the services provided 
may be non-covered services or may not be considered medically necessary under the Medicare 
Program or by other medical insurance companies. You will be responsible for co-payment, deductibles, 
out-of-network amounts or any portion your insurance company indicates is your responsibility. Payment 
for co-pays is expected at the time of service. If this fee is not covered by insurance , it will be your 
responsibility. We allow your insurance company 45 days to pay your claim . If we do not receive 
payment in 45 days , you will be given a bill at that time . For our HMO/PPO patients , if we are 
contracted with your HMO/PPO , you will not receive a bill until we have heard from your insurance 
company</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph)
  }

  getInsurance() {
    const paragraph = `<p style="font-family:Lucida Handwriting">
    I hereby authorize direct payment to Hearing Health of any insurance or health benefits otherwise 
payable to or on behalf of the patient for examination , treatment or devices delivered to me by 
Hearing Health, at the rate not to exceed Hearing Health’s usual charges. I understand that verification 
of insurance coverage obtained over the phone or online is estimated and does not guarantee payment 
and that insurance coverage is a relationship between the patient and his or her insurance company(s). 
I agree to accept financial responsibility for any charges for goods and services rendered to the 
patient that are not paid by insurance or health benefit plan pursuant to this assignment of benefits. 
I have been informed that Medicare does not provide payment for hearing aids, other assistive listening 
devices or fitting examinations.</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);
  }

  getHIPAAAcknowledgement() {
    const paragraph = `<p style="font-family:Lucida Handwriting">
    By signing below, I acknowledge that I received a copy of Hearing Health’s Notice of Privacy Practices. 
The Notice provides information about how we may use and disclose the medical information that we 
maintain about you. We encourage you to read the full Notice. I understand that a copy of the current 
Notice will be posted in the reception area, the website (if applicable) and that any revised Notice 
of Privacy Practices will be made available.</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);

  }

  getCupping() {
    const paragraph = `<p style="font-family:Lucida Handwriting">
    By Cupping therapy is a form of alternative medicine in which a therapist puts special cups 
    on your skin for a few minutes to create suction. It is used for many purposes, including to 
    help with pain , inflammation , blood flow , relaxation and well-being , and as a type of 
    deep-tissue massage. There is almost no risk of use and is similar to any other form of soft 
    tissue work (i.e. massage or Garston) . However, there may be risk of discoloration where 
    the cups were placed . This is a voluntarily treatment option they can be accessed by 
    your therapist with your consent. In order to be prepared in the event of this treatment is 
    desired by your therapist , you are receiving this proactively for permission to utilize 
    Cupping Therapy by the PT of The City team member. The patient &parent/guardian must 
    sign this consent form if you agree to its terms and conditions :.</p>
    <br>
    <ul>
    <li> <span style="color:DodgerBlue;font-family:Lucida Handwriting">understand </span> <span style="font-family:Lucida Handwriting">that all Cupping treatments at this facility are therapeutic and rehabilitative in nature.</span></li>
    <li> <span style="color:DodgerBlue;font-family:Lucida Handwriting">Information </span> <span style="font-family:Lucida Handwriting">has been provided about Cupping Therapy.</span></li>
    <li> <span style="color:DodgerBlue;font-family:Lucida Handwriting">understand </span> <span style="font-family:Lucida Handwriting">the potential effects as explained by the therapist. has been 
    explained to me by Therapist that there is a possibility of discolorations after the 
    treatment sessions.</span></li>
    <li> <span style="color:DodgerBlue;font-family:Lucida Handwriting">understand </span> <span style="font-family:Lucida Handwriting">that the reaction from the Cupping Therapy is discoloration , and not 
    bruising. This reaction occurs from the release and clearing of stagnation and toxins 
    from the body</span>.</li>
    <li><span style="font-family:Lucida Handwriting"> further</span> <span style="color:DodgerBlue;font-family:Lucida Handwriting">understand </span> <span style="font-family:Lucida Handwriting">that these discolorations will dissipate anywhere from a few hours to 
    as long as two weeks.</span></li>
    <li> <span style="color:DodgerBlue;font-family:Lucida Handwriting">agree </span><span style="font-family:Lucida Handwriting"> to communicate with my Therapist if there is any discomfort during the Cupping 
    Therapy session.</span></li>
    <li> <span style="color:DodgerBlue;font-family:Lucida Handwriting">understand </span> <span style="font-family:Lucida Handwriting">that I should avoid extreme exposure to hot showers, baths , Saunas and 
    hot tubs.</span></li>
    <li> <span style="font-family:Lucida Handwriting">It has been</span> <span style="color:DodgerBlue;font-family:Lucida Handwriting">explained </span> <span style="font-family:Lucida Handwriting">that such extremes can produce undesirable effects, and I should 
    avoid such situations.</span></li>
    <li> <span style="font-family:Lucida Handwriting">It has been</span> <span style="color:DodgerBlue;font-family:Lucida Handwriting">explained </span> <span style="font-family:Lucida Handwriting">to me that I should avoid intake of excessive caffeine , alcohol, 
    sugary and processed foods.</span></li>
    <li><span style="font-family:Lucida Handwriting"> It has been </span><span style="color:DodgerBlue;font-family:Lucida Handwriting">highly recommended </span> <span style="font-family:Lucida Handwriting">that before and after treatments that I consume an 
    abundance of water.</span></li>
    </ul>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);
  }

  getPelvic() {
    const paragraph = `<p style="font-family:Lucida Handwriting">
    A Pelvic Examination is an examination of the vagina and rectum, or external pelvic tissue 
or organs. This procedure is used to diagnose and/or treat conditions that involve the pelvis. 
It may be performed using any combination of modalities, which may include the health care 
provider’s gloved hand or instrumentation. For purposes of this consent, vaginal sonography 
might be included. By signing this consent, I <b>${this.patientName}</b> authorize 
PT of The City Team to perform a pelvic examination, including vaginal sonography , as 
described above. By my signature below I acknowledge that I have read and understand 
the contents of this form..</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);
  }

  getPhotoVideo() {
    const paragraph = `<p style="font-family:Lucida Handwriting">I,<b>${this.patientName}</b><br/>
    Grant permission to PT of The City , and its agents and employees the irrevocable and
Unrestricted right to reproduce the photographs and/or video images taken of me , for the 
purpose of publication, promotion, illustration, advertising, or trade, in any manner or in any 
medium. I hereby release PT of The City , and its legalRepresentatives for all claims and 
liability relating to said images or video . Furthermore , I grant permission to use my 
statements that were given during an interview or guest lecture,With or without my name, 
for the purpose of advertising and publicity without restriction. I Waive my right to any<br/>I acknowledge that I am <b>${this.patientName}</b> over the age of 18</p>
`;
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);
  }
}
