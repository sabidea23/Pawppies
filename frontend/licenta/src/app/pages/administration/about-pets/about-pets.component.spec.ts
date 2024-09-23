import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPetsComponent } from './about-pets.component';

describe('AboutPetsComponent', () => {
  let component: AboutPetsComponent;
  let fixture: ComponentFixture<AboutPetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutPetsComponent]
    });
    fixture = TestBed.createComponent(AboutPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
