import { TestBed } from '@angular/core/testing';

import { PatientDocumentService } from './patient-document.service';

describe('PatientDocumentService', () => {
  let service: PatientDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
