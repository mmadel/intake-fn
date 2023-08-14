import { TestBed } from '@angular/core/testing';

import { KCAuthGuardGuard } from './kcauth-guard.guard';

describe('KCAuthGuardGuard', () => {
  let guard: KCAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KCAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
