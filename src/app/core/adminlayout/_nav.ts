import { INavData } from '@coreui/angular-pro';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
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
    url: '/validation',
    iconComponent: { name: 'cil-applicationsSettings' },
    children: [
      {
        name: 'Validation List',
        url: 'validation/list'
      }
    ]
  },
  {
    name: 'Reports',
    url: '/report',
    iconComponent: { name: 'cil-search' },
    children: [
      {
        name: 'Patient Source',
        url: 'report/recommendation'
      }
    ]
  }
];
