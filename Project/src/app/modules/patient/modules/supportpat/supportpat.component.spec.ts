import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportpatComponent } from './supportpat.component';

describe('SupportpatComponent', () => {
  let component: SupportpatComponent;
  let fixture: ComponentFixture<SupportpatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportpatComponent]
    });
    fixture = TestBed.createComponent(SupportpatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
