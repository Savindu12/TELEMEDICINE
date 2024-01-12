import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingactdoComponent } from './bookingactdo.component';

describe('BookingactdoComponent', () => {
  let component: BookingactdoComponent;
  let fixture: ComponentFixture<BookingactdoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingactdoComponent]
    });
    fixture = TestBed.createComponent(BookingactdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
