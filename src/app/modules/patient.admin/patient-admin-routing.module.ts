import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './components/patient.list/patient.list.component';

const routes: Routes = [{
  path: '',
    data: {
      title: 'Administration Console',
    },
    children: [
      {
        path: 'list',
        component: PatientListComponent,
        data: {
          title: 'List Patient Intake',
        },
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientAdminRoutingModule { }
