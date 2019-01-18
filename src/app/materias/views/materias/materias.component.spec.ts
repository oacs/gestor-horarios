import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasComponent } from './materias.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MateriasComponent', () => {
  let component: MateriasComponent;
  let fixture: ComponentFixture<MateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MateriasComponent],
      imports: [ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
