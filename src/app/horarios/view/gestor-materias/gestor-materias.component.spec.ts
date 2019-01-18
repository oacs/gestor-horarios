import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorMateriasComponent } from './gestor-materias.component';

describe('GestorMateriasComponent', () => {
  let component: GestorMateriasComponent;
  let fixture: ComponentFixture<GestorMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestorMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
