import { TestBed } from '@angular/core/testing';

import { UserAuditPatientService } from './user-audit-patient.service';

describe('UserAuditPatientService', () => {
  let service: UserAuditPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuditPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
