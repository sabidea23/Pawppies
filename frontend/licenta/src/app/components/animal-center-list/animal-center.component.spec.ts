import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalCenterComponent } from './animal-center.component';

describe('AnimalCenterComponent', () => {
  let component: AnimalCenterComponent;
  let fixture: ComponentFixture<AnimalCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalCenterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
