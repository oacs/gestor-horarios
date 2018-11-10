import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAlgoritmoComponent } from './test-algoritmo.component';

describe('TestAlgoritmoComponent', () => {
  let component: TestAlgoritmoComponent;
  let fixture: ComponentFixture<TestAlgoritmoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAlgoritmoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAlgoritmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
