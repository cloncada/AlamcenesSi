import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazoCreditoComponent } from './plazo-credito.component';

describe('PlazoCreditoComponent', () => {
  let component: PlazoCreditoComponent;
  let fixture: ComponentFixture<PlazoCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlazoCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlazoCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
