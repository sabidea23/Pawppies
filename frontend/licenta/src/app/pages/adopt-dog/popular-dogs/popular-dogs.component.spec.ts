import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularDogsComponent } from './popular-dogs.component';

describe('PopularDogsComponent', () => {
  let component: PopularDogsComponent;
  let fixture: ComponentFixture<PopularDogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularDogsComponent]
    });
    fixture = TestBed.createComponent(PopularDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
