import { TestBed } from '@angular/core/testing';

import { AysasoftService } from './aysasoft.service';

describe('AysasoftService', () => {
  let service: AysasoftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AysasoftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
