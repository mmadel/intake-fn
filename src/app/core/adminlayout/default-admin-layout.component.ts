import { Component, OnInit } from '@angular/core';
import { navItems } from './_nav';

@Component({
  selector: 'app-default-admin-layout',
  templateUrl: './default-admin-layout.component.html',
  styleUrls: ['./default-admin-layout.component.css']
})
export class DefaultAdminLayoutComponent implements OnInit {
  public navItems = navItems;
  constructor() { }
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  ngOnInit(): void {
  }

}
