import { TestBed } from '@angular/core/testing';

import { PatientBasicService } from './patient.basic.service';

describe('PatientBasicService', () => {
  let service: PatientBasicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientBasicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
