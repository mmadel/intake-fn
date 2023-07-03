import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular-pro';
import { LocalService } from 'src/app/modules/common';
import { AuthService } from 'src/app/modules/security/service/auth.service';
import { adminNavItems } from './_adminnav';
import { userNavItems } from './_usernav';

@Component({
  selector: 'app-default-admin-layout',
  templateUrl: './default-admin-layout.component.html',
  styleUrls: ['./default-admin-layout.component.css']
})
export class DefaultAdminLayoutComponent implements OnInit {
  navItems: INavData[] | null;
  constructor(private authService: AuthService , private localService:LocalService) { }
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  ngOnInit(): void {
    var userRolestring = this.localService.getData('userRole' || '{}');
    if (userRolestring === 'USER')
      this.navItems = userNavItems
    if (userRolestring === 'ADMIN')
      this.navItems = adminNavItems;
  }

  checkUserRole() {
    return this.localService.getData('userRole' || '{}');
  }

}
