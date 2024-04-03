import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatBehaviorComponent } from './cat-behavior.component';

describe('CatBehaviorComponent', () => {
  let component: CatBehaviorComponent;
  let fixture: ComponentFixture<CatBehaviorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatBehaviorComponent]
    });
    fixture = TestBed.createComponent(CatBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
