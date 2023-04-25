import { TestBed } from '@angular/core/testing';

import { DiplomeeService } from './diplomee.service';

describe('DiplomeeService', () => {
  let service: DiplomeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiplomeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
