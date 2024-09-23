import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HairlessCatComponent } from './hairless-cat.component';

describe('HairlessCatComponent', () => {
  let component: HairlessCatComponent;
  let fixture: ComponentFixture<HairlessCatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HairlessCatComponent]
    });
    fixture = TestBed.createComponent(HairlessCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
