import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCatComponent } from './feed-cat.component';

describe('FeedCatComponent', () => {
  let component: FeedCatComponent;
  let fixture: ComponentFixture<FeedCatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedCatComponent]
    });
    fixture = TestBed.createComponent(FeedCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
