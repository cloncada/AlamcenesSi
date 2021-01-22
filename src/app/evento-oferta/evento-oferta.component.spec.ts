import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoOfertaComponent } from './evento-oferta.component';

describe('EventoOfertaComponent', () => {
  let component: EventoOfertaComponent;
  let fixture: ComponentFixture<EventoOfertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoOfertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
