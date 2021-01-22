import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasListComponent } from './ofertas-list.component';

describe('OfertasListComponent', () => {
  let component: OfertasListComponent;
  let fixture: ComponentFixture<OfertasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
