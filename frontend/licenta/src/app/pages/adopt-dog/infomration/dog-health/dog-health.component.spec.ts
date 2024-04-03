import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogHealthComponent } from './dog-health.component';

describe('DogHealthComponent', () => {
  let component: DogHealthComponent;
  let fixture: ComponentFixture<DogHealthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DogHealthComponent]
    });
    fixture = TestBed.createComponent(DogHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
