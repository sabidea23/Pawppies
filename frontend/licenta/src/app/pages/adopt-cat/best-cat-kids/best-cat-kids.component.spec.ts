import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestCatKidsComponent } from './best-cat-kids.component';

describe('BestCatKidsComponent', () => {
  let component: BestCatKidsComponent;
  let fixture: ComponentFixture<BestCatKidsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BestCatKidsComponent]
    });
    fixture = TestBed.createComponent(BestCatKidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
