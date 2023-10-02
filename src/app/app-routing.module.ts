import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultAdminLayoutComponent, DefaultLayoutComponent } from './core';
import { KCAuthGuardGuard } from './modules/security/service/kc/kcauth-guard.guard';


const routes: Routes = [
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
        path: 'intake',
        canActivate: [KCAuthGuardGuard],
        loadChildren: () =>
          import('./modules/patient.questionnaire/patient-questionnaire.module').then((m) => m.PatientQuestionnaireModule)
      },
    ]
  },
  {
    path: 'admin',
    component: DefaultAdminLayoutComponent,
    canActivate: [KCAuthGuardGuard],
    data: {
      title: '',
      roles: ['administrator','normal']
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
