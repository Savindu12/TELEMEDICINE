import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxdoComponent } from './inboxdo.component';

describe('InboxdoComponent', () => {
  let component: InboxdoComponent;
  let fixture: ComponentFixture<InboxdoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InboxdoComponent]
    });
    fixture = TestBed.createComponent(InboxdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
