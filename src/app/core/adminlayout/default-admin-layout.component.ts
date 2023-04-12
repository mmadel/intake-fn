import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular-pro';
import { AuthService } from 'src/app/modules/security/service/auth.service';

@Component({
  selector: 'app-default-admin-layout',
  templateUrl: './default-admin-layout.component.html',
  styleUrls: ['./default-admin-layout.component.css']
})
export class DefaultAdminLayoutComponent implements OnInit {
  navItems: INavData[] | null;
  constructor(private authService: AuthService) { }
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  ngOnInit(): void {
    this.authService.navItems$.subscribe(navItems => {
      console.log(JSON.stringify(navItems))
      this.navItems = navItems ;
    })
  }

}
