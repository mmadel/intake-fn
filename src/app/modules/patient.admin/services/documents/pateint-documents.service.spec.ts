import { TestBed } from '@angular/core/testing';

import { PateintDocumentsService } from './pateint-documents.service';

describe('PateintDocumentsService', () => {
  let service: PateintDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PateintDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
