import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationdoComponent } from './notificationdo.component';

describe('NotificationdoComponent', () => {
  let component: NotificationdoComponent;
  let fixture: ComponentFixture<NotificationdoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationdoComponent]
    });
    fixture = TestBed.createComponent(NotificationdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
