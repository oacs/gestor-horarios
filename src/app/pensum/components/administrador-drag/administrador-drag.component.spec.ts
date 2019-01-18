import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorDragComponent } from './administrador-drag.component';

describe('AdministradorDragComponent', () => {
  let component: AdministradorDragComponent;
  let fixture: ComponentFixture<AdministradorDragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradorDragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
