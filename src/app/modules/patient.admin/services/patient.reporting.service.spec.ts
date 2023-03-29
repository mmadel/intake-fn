import { TestBed } from '@angular/core/testing';

import { PatientReportingService } from './patient.reporting.service';

describe('PatientReportingService', () => {
  let service: PatientReportingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientReportingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
