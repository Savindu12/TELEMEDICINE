import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientlitComponent } from './patientlit.component';

describe('PatientlitComponent', () => {
  let component: PatientlitComponent;
  let fixture: ComponentFixture<PatientlitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientlitComponent]
    });
    fixture = TestBed.createComponent(PatientlitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
