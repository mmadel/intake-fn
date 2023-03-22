import { INavData } from '@coreui/angular-pro';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Patient',
    url: '/patient',
    iconComponent: { name: 'cil-disabled' },
    children: [
      {
        name: 'Patient List',
        url: '/admin/list'
      }
    ]
  }
];
