import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocumentsPatientComponent } from './view-documents-patient.component';

describe('ViewDocumentsPatientComponent', () => {
  let component: ViewDocumentsPatientComponent;
  let fixture: ComponentFixture<ViewDocumentsPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDocumentsPatientComponent]
    });
    fixture = TestBed.createComponent(ViewDocumentsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
