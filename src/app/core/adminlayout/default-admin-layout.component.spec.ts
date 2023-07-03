import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultAdminLayoutComponent } from './default-admin-layout.component';

describe('DefaultAdminLayoutComponent', () => {
  let component: DefaultAdminLayoutComponent;
  let fixture: ComponentFixture<DefaultAdminLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultAdminLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultAdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
