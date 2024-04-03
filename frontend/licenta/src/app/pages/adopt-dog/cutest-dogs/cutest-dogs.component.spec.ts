import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutestDogsComponent } from './cutest-dogs.component';

describe('CutestDogsComponent', () => {
  let component: CutestDogsComponent;
  let fixture: ComponentFixture<CutestDogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CutestDogsComponent]
    });
    fixture = TestBed.createComponent(CutestDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
