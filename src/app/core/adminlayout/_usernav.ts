import { INavData } from '@coreui/angular-pro';

export const userNavItems: INavData[] = [
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
  }
];
