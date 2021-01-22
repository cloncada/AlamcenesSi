import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediosDePagoComponent } from './medios-de-pago.component';

describe('MediosDePagoComponent', () => {
  let component: MediosDePagoComponent;
  let fixture: ComponentFixture<MediosDePagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediosDePagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediosDePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
