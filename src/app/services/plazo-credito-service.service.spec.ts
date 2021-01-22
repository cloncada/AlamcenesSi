import { TestBed } from '@angular/core/testing';

import { PlazoCreditoServiceService } from './plazo-credito-service.service';

describe('PlazoCreditoServiceService', () => {
  let service: PlazoCreditoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlazoCreditoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
