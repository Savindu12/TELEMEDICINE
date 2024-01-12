import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingactComponent } from './bookingact.component';

describe('BookingactComponent', () => {
  let component: BookingactComponent;
  let fixture: ComponentFixture<BookingactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingactComponent]
    });
    fixture = TestBed.createComponent(BookingactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
