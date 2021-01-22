import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoCompraComponent } from './punto-compra.component';

describe('PuntoCompraComponent', () => {
  let component: PuntoCompraComponent;
  let fixture: ComponentFixture<PuntoCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntoCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
