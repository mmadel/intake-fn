import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicCreationComponent } from './components/clinic/create/clinic.creation.component';
import { ClinicListComponent } from './components/clinic/list/clinic.list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientListComponent } from './components/patient.list/patient.list.component';
import { RecommendationReportComponent } from './components/reports/recommendation.report.component';
import { UserCreationComponent } from './components/user/create/user-creation.component';
import { UserListComponent } from './components/user/list/user-list.component';
import { ValidationListComponent } from './components/validation/validation.list.component';

const routes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent,
  data: {
    title: 'Dashboard'
  }
},
{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full',
},
{
  path: '',
  data: {
    title: 'pateint',
  },
  children: [
    {
      path: 'patient/list',
      component: PatientListComponent,
      data: {
        title: 'Patients',
      },
    }
  ]
},
{
  path: '',
  data: {
    title: 'administration',
  },
  children: [
    {
      path: 'validation/list',
      component: ValidationListComponent,
      data: {
        title: 'validation-fields',
      },
    },
    {
      path: 'clinic/list',
      component: ClinicListComponent,
      data: {
        title: 'clinics-list',
      },
    },
    {
      path: 'clinic/creation',
      component: ClinicCreationComponent,
      data: {
        title: 'clinic-Creation',
      },
    },
    {
      path: 'user/list',
      component: UserListComponent,
      data: {
        title: 'users-list',
      },
    },
    {
      path: 'user/creation',
      component: UserCreationComponent,
      data: {
        title: 'user-Creation',
      },
    }
  ]
},
{
  path: '',
  data: {
    title: 'Reports',
  },
  children: [
    {
      path: 'report/recommendation',
      component: RecommendationReportComponent,
      data: {
        title: 'patient-source',
      },
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientAdminRoutingModule { }
