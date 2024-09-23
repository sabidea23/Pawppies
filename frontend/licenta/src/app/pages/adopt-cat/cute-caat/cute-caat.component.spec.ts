import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuteCaatComponent } from './cute-caat.component';

describe('CuteCaatComponent', () => {
  let component: CuteCaatComponent;
  let fixture: ComponentFixture<CuteCaatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuteCaatComponent]
    });
    fixture = TestBed.createComponent(CuteCaatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
