import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaDetailsComponent } from './oferta-details.component';

describe('OfertaDetailsComponent', () => {
  let component: OfertaDetailsComponent;
  let fixture: ComponentFixture<OfertaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
