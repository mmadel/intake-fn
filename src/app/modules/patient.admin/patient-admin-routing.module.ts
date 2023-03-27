import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './components/patient.list/patient.list.component';
import { ValidationListComponent } from './components/validation/validation.list.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Administration Console',
  },
  children: [
    {
      path: 'patient/list',
      component: PatientListComponent,
      data: {
        title: 'List Patient Intake',
      },
    },
    {
      path: 'validation/list',
      component: ValidationListComponent,
      data: {
        title: 'List Validation Fields',
      },
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientAdminRoutingModule { }