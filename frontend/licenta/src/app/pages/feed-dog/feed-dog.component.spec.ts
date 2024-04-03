import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedDogComponent } from './feed-dog.component';

describe('FeedDogComponent', () => {
  let component: FeedDogComponent;
  let fixture: ComponentFixture<FeedDogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedDogComponent]
    });
    fixture = TestBed.createComponent(FeedDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
