import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalCenterAddComponent } from './animal-center-add.component';

describe('AnimalCenterAddComponent', () => {
  let component: AnimalCenterAddComponent;
  let fixture: ComponentFixture<AnimalCenterAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalCenterAddComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalCenterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
