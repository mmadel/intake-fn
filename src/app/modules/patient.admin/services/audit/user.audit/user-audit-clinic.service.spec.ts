import { TestBed } from '@angular/core/testing';

import { UserAuditClinicService } from './user-audit-clinic.service';

describe('UserAuditClinicService', () => {
  let service: UserAuditClinicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuditClinicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
