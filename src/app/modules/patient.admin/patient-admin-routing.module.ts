import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditComponent } from './components/audit/audit.component';
import { ClinicCreationComponent } from './components/clinic/create/clinic.creation.component';
import { ClinicListComponent } from './components/clinic/list/clinic.list.component';
import { UpdateClinicComponent } from './components/clinic/update/update-clinic.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InsuranceCompanyCreateComponent } from './components/insurance.company/create/insurance-company-create.component';
import { InsuranceCompanyListComponent } from './components/insurance.company/list/insurance-company-list.component';
import { PatientCreateComponent } from './components/patient.create/patient-create.component';
import { PatientListComponent } from './components/patient.list/patient.list.component';
import { RecommendationReportComponent } from './components/reports/recommendation.report.component';
import { UserCreationComponent } from './components/user/create/user-creation.component';
import { UserListComponent } from './components/user/list/user-list.component';
import { UserUpdateComponent } from './components/user/update/user-update.component';
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
        title: 'list',
      },
    },
    {
      path: 'patient/create',
      component: PatientCreateComponent,
      data: {
        title: 'create',
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
      path: 'clinic/update/:clinicId',
      component: UpdateClinicComponent,
      data: {
        title: 'clinic-update',
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
    },
    {
      path: 'user/update/:userId',
      component: UserUpdateComponent,
      data: {
        title: 'user-update',
      }
    },
    {
      path: 'insurance/company/list',
      component: InsuranceCompanyListComponent,
      data: {
        title: 'insurance-company-list',
      }
    },
    {
      path: 'insurance/company/create',
      component: InsuranceCompanyCreateComponent,
      data: {
        title: 'insurance-company-create',
      }
    },
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
},
{
  path: '',
  data: {
    title: 'Auditing',
  },
  children: [
    {
      path: 'audit/auditing',
      component: AuditComponent,
      data: {
        title: 'auditing',
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
