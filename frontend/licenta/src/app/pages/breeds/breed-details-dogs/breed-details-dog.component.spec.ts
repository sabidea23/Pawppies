import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedDetailsDogComponent } from './breed-details-dog.component';

describe('BreedDetailsComponent', () => {
  let component: BreedDetailsDogComponent;
  let fixture: ComponentFixture<BreedDetailsDogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreedDetailsDogComponent]
    });
    fixture = TestBed.createComponent(BreedDetailsDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
