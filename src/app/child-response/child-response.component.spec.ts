import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildResponseComponent } from './child-response.component';

describe('ChildResponseComponent', () => {
  let component: ChildResponseComponent;
  let fixture: ComponentFixture<ChildResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
