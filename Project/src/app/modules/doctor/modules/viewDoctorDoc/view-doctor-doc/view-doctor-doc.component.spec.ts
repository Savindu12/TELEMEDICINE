import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDoctorDocComponent } from './view-doctor-doc.component';

describe('ViewDoctorDocComponent', () => {
  let component: ViewDoctorDocComponent;
  let fixture: ComponentFixture<ViewDoctorDocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDoctorDocComponent]
    });
    fixture = TestBed.createComponent(ViewDoctorDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
