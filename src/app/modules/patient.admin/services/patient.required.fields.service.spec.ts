import { TestBed } from '@angular/core/testing';

import { PatientRequiredFieldsService } from './patient.required.fields.service';

describe('PatientRequiredFieldsService', () => {
  let service: PatientRequiredFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientRequiredFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
