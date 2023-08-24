import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular-pro';
import { LocalService } from 'src/app/modules/common';
import { KcAuthServiceService } from 'src/app/modules/security/service/kc/kc-auth-service.service';
import { adminNavItems } from './_adminnav';
import { userNavItems } from './_usernav';

@Component({
  selector: 'app-default-admin-layout',
  templateUrl: './default-admin-layout.component.html',
  styleUrls: ['./default-admin-layout.component.css']
})
export class DefaultAdminLayoutComponent implements OnInit {
  navItems: INavData[] | null;
  constructor(private localService: LocalService,
    private kcUserService: KcAuthServiceService) { }
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  ngOnInit(): void {
    if (this.kcUserService.isUserInRole('normal'))
      this.navItems = userNavItems
    if (this.kcUserService.isUserInRole('administrator'))
      this.navItems = adminNavItems;
  }
}
