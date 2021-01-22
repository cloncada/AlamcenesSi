import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVentajaComponent } from './tipo-ventaja.component';

describe('TipoVentajaComponent', () => {
  let component: TipoVentajaComponent;
  let fixture: ComponentFixture<TipoVentajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoVentajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoVentajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
