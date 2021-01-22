import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesModuleComponent } from './acces-module.component';

describe('AccesModuleComponent', () => {
  let component: AccesModuleComponent;
  let fixture: ComponentFixture<AccesModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
