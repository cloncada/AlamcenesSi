import { TestBed } from '@angular/core/testing';

import { OfertasServiceService } from './ofertas-service.service';

describe('OfertasServiceService', () => {
  let service: OfertasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfertasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
