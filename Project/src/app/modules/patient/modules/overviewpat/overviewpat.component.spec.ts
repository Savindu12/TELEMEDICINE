import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewpatComponent } from './overviewpat.component';

describe('OverviewpatComponent', () => {
  let component: OverviewpatComponent;
  let fixture: ComponentFixture<OverviewpatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewpatComponent]
    });
    fixture = TestBed.createComponent(OverviewpatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
