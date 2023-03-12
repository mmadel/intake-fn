import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  QuestionnaireAddComponent,
  EssentialInfoComponent,
  AddressInformationComponent,
  InsuranceInformationComponent,
} from './index';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'PatientQuestionnaire',
    },
    children: [
      {
        path: 'add',
        component: QuestionnaireAddComponent,
        data: {
          title: 'Essential Info',
        },
      },
      {
        path: 'essential',
        component: EssentialInfoComponent,
        data: {
          title: 'Essential Info',
        },
      },
      {
        path: 'address',
        component: AddressInformationComponent,
        data: {
          title: 'Address Info',
        },
      },
      {
        path: 'insurance',
        component: InsuranceInformationComponent,
        data: {
          title: 'Insurance Info',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientQuestionnaireRoutingModule { }
