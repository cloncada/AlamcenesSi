import { TestBed } from '@angular/core/testing';

import { MediosDePagoServiceService } from './medios-de-pago-service.service';

describe('MediosDePagoServiceService', () => {
  let service: MediosDePagoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediosDePagoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
