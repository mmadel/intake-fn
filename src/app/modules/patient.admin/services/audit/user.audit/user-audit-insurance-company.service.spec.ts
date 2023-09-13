import { TestBed } from '@angular/core/testing';

import { UserAuditInsuranceCompanyService } from './user-audit-insurance-company.service';

describe('UserAuditInsuranceCompanyService', () => {
  let service: UserAuditInsuranceCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuditInsuranceCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
