import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPatientAuditComponent } from './user-patient-audit.component';

describe('UserPatientAuditComponent', () => {
  let component: UserPatientAuditComponent;
  let fixture: ComponentFixture<UserPatientAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPatientAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPatientAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
