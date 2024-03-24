import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalDetailsComponent } from './animal-details.component';

describe('AnimalDetailsComponent', () => {
  let component: AnimalDetailsComponent;
  let fixture: ComponentFixture<AnimalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalDetailsComponent]
    });
    fixture = TestBed.createComponent(AnimalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
