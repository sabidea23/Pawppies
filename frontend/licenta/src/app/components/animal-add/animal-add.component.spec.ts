import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnimalAddComponent} from './animal-add.component';

describe('AnimalAddComponent', () => {
  let component: AnimalAddComponent;
  let fixture: ComponentFixture<AnimalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalAddComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
