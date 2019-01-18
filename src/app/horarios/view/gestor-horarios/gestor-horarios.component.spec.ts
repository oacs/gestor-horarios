import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorHorariosComponent } from './gestor-horarios.component';

describe('GestorHorariosComponent', () => {
  let component: GestorHorariosComponent;
  let fixture: ComponentFixture<GestorHorariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestorHorariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
