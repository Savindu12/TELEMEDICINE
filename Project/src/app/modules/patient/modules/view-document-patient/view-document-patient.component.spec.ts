import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocumentPatientComponent } from './view-document-patient.component';

describe('ViewDocumentPatientComponent', () => {
  let component: ViewDocumentPatientComponent;
  let fixture: ComponentFixture<ViewDocumentPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDocumentPatientComponent]
    });
    fixture = TestBed.createComponent(ViewDocumentPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
