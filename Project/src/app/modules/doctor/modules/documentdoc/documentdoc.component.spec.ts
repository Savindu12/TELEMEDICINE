import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentdocComponent } from './documentdoc.component';

describe('DocumentdocComponent', () => {
  let component: DocumentdocComponent;
  let fixture: ComponentFixture<DocumentdocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentdocComponent]
    });
    fixture = TestBed.createComponent(DocumentdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
