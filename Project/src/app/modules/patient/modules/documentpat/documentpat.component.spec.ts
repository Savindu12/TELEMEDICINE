import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentpatComponent } from './documentpat.component';

describe('DocumentpatComponent', () => {
  let component: DocumentpatComponent;
  let fixture: ComponentFixture<DocumentpatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentpatComponent]
    });
    fixture = TestBed.createComponent(DocumentpatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
