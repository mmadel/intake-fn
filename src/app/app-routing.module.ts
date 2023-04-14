import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultAdminLayoutComponent, DefaultLayoutComponent } from './core';
import { AuthGuard, LoginComponent } from './modules/security';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'questionnaire',
        loadChildren: () =>
          import('./modules/patient.questionnaire/patient-questionnaire.module').then((m) => m.PatientQuestionnaireModule)
      },
    ]
  },
  {
    path: 'admin',
    component: DefaultAdminLayoutComponent,
    canActivateChild: [AuthGuard],
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/patient.admin/patient-admin.module').then((m) => m.PatientAdminModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
