import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideContentContainerComponent } from './side-content-container.component';

describe('SideContentContainerComponent', () => {
  let component: SideContentContainerComponent;
  let fixture: ComponentFixture<SideContentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideContentContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideContentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
