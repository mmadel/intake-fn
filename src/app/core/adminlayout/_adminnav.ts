import { INavData } from '@coreui/angular-pro';

export const adminNavItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/admin/dashboard',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Patient',
    url: 'patient',
    iconComponent: { name: 'cil-disabled' },
    children: [
      {
        name: 'Patient List',
        url: 'patient/list'
      }
    ]
  },
  {
    name: 'Administration',
    url: '',
    iconComponent: { name: 'cil-applicationsSettings' },
    children: [
      {
        name: 'Validation List',
        url: 'validation/list'
      },
      {
        name: 'Clinic List',
        url: 'clinic/list'
      }
    ],
  },
  {
    name: 'Reports',
    url: '',
    iconComponent: { name: 'cil-search' },
    children: [
      {
        name: 'Patient Source',
        url: 'report/recommendation'
      }
    ]
  }
];
