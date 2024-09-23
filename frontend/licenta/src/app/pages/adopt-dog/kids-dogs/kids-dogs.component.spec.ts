import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsDogsComponent } from './kids-dogs.component';

describe('KidsDogsComponent', () => {
  let component: KidsDogsComponent;
  let fixture: ComponentFixture<KidsDogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KidsDogsComponent]
    });
    fixture = TestBed.createComponent(KidsDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
