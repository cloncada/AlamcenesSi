import { TestBed } from '@angular/core/testing';

import { AreasServiceService } from './areas-service.service';

describe('AreasServiceService', () => {
  let service: AreasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
