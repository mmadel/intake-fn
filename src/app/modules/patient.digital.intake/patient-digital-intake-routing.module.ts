import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDigitalPatientIntakeComponent } from './components/create/create-digital-patient-intake.component';

const routes: Routes = [
  {
    path: '',
    data: {
    },
    children:[
      {
        path:'',
        component:CreateDigitalPatientIntakeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientDigitalIntakeRoutingModule { }
