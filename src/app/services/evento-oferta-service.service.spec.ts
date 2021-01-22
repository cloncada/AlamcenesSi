import { TestBed } from '@angular/core/testing';

import { EventoOfertaServiceService } from './evento-oferta-service.service';

describe('EventoOfertaServiceService', () => {
  let service: EventoOfertaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventoOfertaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
