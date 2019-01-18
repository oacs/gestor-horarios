import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaMateriaComponent } from './carta-materia.component';

describe('CartaMateriaComponent', () => {
  let component: CartaMateriaComponent;
  let fixture: ComponentFixture<CartaMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
