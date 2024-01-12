import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewdocComponent } from './overviewdoc.component';

describe('OverviewdocComponent', () => {
  let component: OverviewdocComponent;
  let fixture: ComponentFixture<OverviewdocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewdocComponent]
    });
    fixture = TestBed.createComponent(OverviewdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
