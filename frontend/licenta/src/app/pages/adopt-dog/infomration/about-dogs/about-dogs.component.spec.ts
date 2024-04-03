import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDogsComponent } from './about-dogs.component';

describe('AboutDogsComponent', () => {
  let component: AboutDogsComponent;
  let fixture: ComponentFixture<AboutDogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutDogsComponent]
    });
    fixture = TestBed.createComponent(AboutDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
