import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoOfertaComponent } from './tipo-oferta.component';

describe('TipoOfertaComponent', () => {
  let component: TipoOfertaComponent;
  let fixture: ComponentFixture<TipoOfertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoOfertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
