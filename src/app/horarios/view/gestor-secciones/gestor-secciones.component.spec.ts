import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorSeccionesComponent } from './gestor-secciones.component';

describe('GestorSeccionesComponent', () => {
  let component: GestorSeccionesComponent;
  let fixture: ComponentFixture<GestorSeccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestorSeccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorSeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
