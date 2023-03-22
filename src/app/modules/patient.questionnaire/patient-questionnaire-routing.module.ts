import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  QuestionnaireAddComponent,
  SubmitionComponent,
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
        path: 'submitted',
        component: SubmitionComponent,
        data: {
          title: 'Submition',
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientQuestionnaireRoutingModule { }
