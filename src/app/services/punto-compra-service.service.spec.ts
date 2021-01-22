import { TestBed } from '@angular/core/testing';

import { PuntoCompraServiceService } from './punto-compra-service.service';

describe('PuntoCompraServiceService', () => {
  let service: PuntoCompraServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuntoCompraServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
