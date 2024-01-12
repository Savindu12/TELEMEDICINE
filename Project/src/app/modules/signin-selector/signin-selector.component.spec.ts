import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninSelectorComponent } from './signin-selector.component';

describe('SigninSelectorComponent', () => {
  let component: SigninSelectorComponent;
  let fixture: ComponentFixture<SigninSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninSelectorComponent]
    });
    fixture = TestBed.createComponent(SigninSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
