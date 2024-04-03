import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluffyCatComponent } from './fluffy-cat.component';

describe('FluffyCatComponent', () => {
  let component: FluffyCatComponent;
  let fixture: ComponentFixture<FluffyCatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FluffyCatComponent]
    });
    fixture = TestBed.createComponent(FluffyCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
