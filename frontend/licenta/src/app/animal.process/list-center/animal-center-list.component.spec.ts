import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalCenterList } from './animal-center-list.component';

describe('UniversityListComponent', () => {
  let component: AnimalCenterList;
  let fixture: ComponentFixture<AnimalCenterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalCenterList]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalCenterList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
