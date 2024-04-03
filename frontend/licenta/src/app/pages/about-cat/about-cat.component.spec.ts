import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCatComponent } from './about-cat.component';

describe('AboutCatComponent', () => {
  let component: AboutCatComponent;
  let fixture: ComponentFixture<AboutCatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutCatComponent]
    });
    fixture = TestBed.createComponent(AboutCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
