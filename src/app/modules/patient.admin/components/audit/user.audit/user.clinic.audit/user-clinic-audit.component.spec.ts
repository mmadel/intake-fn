import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClinicAuditComponent } from './user-clinic-audit.component';

describe('UserClinicAuditComponent', () => {
  let component: UserClinicAuditComponent;
  let fixture: ComponentFixture<UserClinicAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserClinicAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserClinicAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
