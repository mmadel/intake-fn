import { INavData } from '@coreui/angular-pro';

export const userNavItems: INavData[] = [
  {
    name: 'Patient',
    url: '',
    iconComponent: { name: 'cil-disabled' },
    children: [
      {
        name: 'Patient List',
        url: 'patient/list'
      },
      {
        name: 'Patient Creation',
        url: 'patient/create'
      }
    ]
  }
];
