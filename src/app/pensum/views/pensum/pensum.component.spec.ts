import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensumComponent } from './pensum.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AdministradorDragComponent } from '../../components/administrador-drag/administrador-drag.component';

describe('PensumComponent', () => {
  let component: PensumComponent;
  let fixture: ComponentFixture<PensumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PensumComponent, AdministradorDragComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        DragDropModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
