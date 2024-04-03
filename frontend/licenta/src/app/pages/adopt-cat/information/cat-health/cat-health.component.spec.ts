import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatHealthComponent } from './cat-health.component';

describe('CatHealthComponent', () => {
  let component: CatHealthComponent;
  let fixture: ComponentFixture<CatHealthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatHealthComponent]
    });
    fixture = TestBed.createComponent(CatHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
