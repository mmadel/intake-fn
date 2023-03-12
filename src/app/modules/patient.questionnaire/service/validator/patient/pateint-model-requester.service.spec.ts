import { TestBed } from '@angular/core/testing';

import { PateintModelRequesterService } from './pateint-model-requester.service';

describe('PateintModelRequesterService', () => {
  let service: PateintModelRequesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PateintModelRequesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
