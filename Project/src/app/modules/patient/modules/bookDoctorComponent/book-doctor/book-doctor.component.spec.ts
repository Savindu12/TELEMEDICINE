import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDoctorComponent } from './book-doctor.component';

describe('BookDoctorComponent', () => {
  let component: BookDoctorComponent;
  let fixture: ComponentFixture<BookDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookDoctorComponent]
    });
    fixture = TestBed.createComponent(BookDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
