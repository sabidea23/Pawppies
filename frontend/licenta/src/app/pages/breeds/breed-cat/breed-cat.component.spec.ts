import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedCatComponent } from './breed-cat.component';

describe('BreedCatComponent', () => {
  let component: BreedCatComponent;
  let fixture: ComponentFixture<BreedCatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreedCatComponent]
    });
    fixture = TestBed.createComponent(BreedCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
