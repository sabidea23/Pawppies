import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedDetailsCatComponent } from './breed-details-cat.component';

describe('BreedDetailsCatComponent', () => {
  let component: BreedDetailsCatComponent;
  let fixture: ComponentFixture<BreedDetailsCatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreedDetailsCatComponent]
    });
    fixture = TestBed.createComponent(BreedDetailsCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
