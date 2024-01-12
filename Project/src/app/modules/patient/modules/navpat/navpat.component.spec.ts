import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavpatComponent } from './navpat.component';

describe('NavpatComponent', () => {
  let component: NavpatComponent;
  let fixture: ComponentFixture<NavpatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavpatComponent]
    });
    fixture = TestBed.createComponent(NavpatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
