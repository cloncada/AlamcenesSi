import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessOfertComponent } from './process-ofert.component';

describe('ProcessOfertComponent', () => {
  let component: ProcessOfertComponent;
  let fixture: ComponentFixture<ProcessOfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessOfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessOfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
