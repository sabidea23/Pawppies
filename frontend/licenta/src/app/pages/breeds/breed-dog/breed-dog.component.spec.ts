import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedDogComponent } from './breed-dog.component';

describe('BreedDogComponent', () => {
  let component: BreedDogComponent;
  let fixture: ComponentFixture<BreedDogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreedDogComponent]
    });
    fixture = TestBed.createComponent(BreedDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
