import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorDragComponent } from './administrador-drag.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('AdministradorDragComponent', () => {
  let component: AdministradorDragComponent;
  let fixture: ComponentFixture<AdministradorDragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DragDropModule],
      declarations: [AdministradorDragComponent]
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
