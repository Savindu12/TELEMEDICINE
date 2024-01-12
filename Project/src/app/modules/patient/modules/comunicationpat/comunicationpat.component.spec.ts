import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicationpatComponent } from './comunicationpat.component';

describe('ComunicationpatComponent', () => {
  let component: ComunicationpatComponent;
  let fixture: ComponentFixture<ComunicationpatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunicationpatComponent]
    });
    fixture = TestBed.createComponent(ComunicationpatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
