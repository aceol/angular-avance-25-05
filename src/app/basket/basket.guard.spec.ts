import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { basketGuard } from './basket.guard';

describe('basketGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => basketGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
