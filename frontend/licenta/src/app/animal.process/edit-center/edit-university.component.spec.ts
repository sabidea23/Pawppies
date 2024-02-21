import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUniversityComponent } from './edit-university.component';

describe('EditUniversityComponent', () => {
  let component: EditUniversityComponent;
  let fixture: ComponentFixture<EditUniversityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUniversityComponent]
    });
    fixture = TestBed.createComponent(EditUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
