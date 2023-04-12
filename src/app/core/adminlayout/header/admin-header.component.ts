import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ClassToggleService, HeaderComponent } from '@coreui/angular-pro';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent extends HeaderComponent  {
  public get classToggler(): ClassToggleService {
    return this._classToggler;
  }
  public set classToggler(value: ClassToggleService) {
    this._classToggler = value;
  }

  @Input() sidebarId: string = "sidebar1";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  public themeSwitch = new UntypedFormGroup({
    themeSwitchRadio: new UntypedFormControl('light'),
  });

  constructor(private _classToggler: ClassToggleService) {
    super();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  setTheme(value: string): void {
    this.themeSwitch.setValue({ themeSwitchRadio: value });
    this.classToggler.toggle('body', 'dark-theme');
  }

}
