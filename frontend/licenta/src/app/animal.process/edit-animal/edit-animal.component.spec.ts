import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnimalComponent } from './edit-animal.component';

describe('EditAnimalComponent', () => {
  let component: EditAnimalComponent;
  let fixture: ComponentFixture<EditAnimalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAnimalComponent]
    });
    fixture = TestBed.createComponent(EditAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
