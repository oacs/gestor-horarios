import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresComponent } from './profesores.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfesorService } from '../../../providers/profesor/profesor.service';
import { CommonModule } from '@angular/common';

describe('ProfesoresComponent', () => {
  let component: ProfesoresComponent;
  let fixture: ComponentFixture<ProfesoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfesoresComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientTestingModule],
      providers: [ProfesorService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
