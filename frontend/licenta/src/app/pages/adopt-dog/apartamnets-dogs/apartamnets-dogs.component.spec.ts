import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartamnetsDogsComponent } from './apartamnets-dogs.component';

describe('ApartamnetsDogsComponent', () => {
  let component: ApartamnetsDogsComponent;
  let fixture: ComponentFixture<ApartamnetsDogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApartamnetsDogsComponent]
    });
    fixture = TestBed.createComponent(ApartamnetsDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
