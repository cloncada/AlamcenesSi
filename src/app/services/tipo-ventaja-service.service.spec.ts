import { TestBed } from '@angular/core/testing';

import { TipoVentajaServiceService } from './tipo-ventaja-service.service';

describe('TipoVentajaServiceService', () => {
  let service: TipoVentajaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoVentajaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
