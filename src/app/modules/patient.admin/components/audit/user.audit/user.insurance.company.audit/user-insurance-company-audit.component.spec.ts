import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInsuranceCompanyAuditComponent } from './user-insurance-company-audit.component';

describe('UserInsuranceCompanyAuditComponent', () => {
  let component: UserInsuranceCompanyAuditComponent;
  let fixture: ComponentFixture<UserInsuranceCompanyAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInsuranceCompanyAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInsuranceCompanyAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
