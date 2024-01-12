import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDOcComponent } from './doctor-doc.component';

describe('DoctorDOcComponent', () => {
  let component: DoctorDOcComponent;
  let fixture: ComponentFixture<DoctorDOcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorDOcComponent]
    });
    fixture = TestBed.createComponent(DoctorDOcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
