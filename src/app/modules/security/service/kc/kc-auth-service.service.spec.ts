import { TestBed } from '@angular/core/testing';

import { KcAuthServiceService } from './kc-auth-service.service';

describe('KcAuthServiceService', () => {
  let service: KcAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KcAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
