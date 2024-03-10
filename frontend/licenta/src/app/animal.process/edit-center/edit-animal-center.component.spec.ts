import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnimalCenterComponent } from './edit-animal-center.component';

describe('EditUniversityComponent', () => {
  let component: EditAnimalCenterComponent;
  let fixture: ComponentFixture<EditAnimalCenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAnimalCenterComponent]
    });
    fixture = TestBed.createComponent(EditAnimalCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
