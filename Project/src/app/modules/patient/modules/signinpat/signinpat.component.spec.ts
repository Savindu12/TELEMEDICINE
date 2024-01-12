import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninpatComponent } from './signinpat.component';

describe('SigninpatComponent', () => {
  let component: SigninpatComponent;
  let fixture: ComponentFixture<SigninpatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninpatComponent]
    });
    fixture = TestBed.createComponent(SigninpatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
