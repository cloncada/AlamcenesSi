import { TestBed } from '@angular/core/testing';

import { TipoOfertaServiceService } from './tipo-oferta-service.service';

describe('TipoOfertaServiceService', () => {
  let service: TipoOfertaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoOfertaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
