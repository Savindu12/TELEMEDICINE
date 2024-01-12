import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesharedocComponent } from './filesharedoc.component';

describe('FilesharedocComponent', () => {
  let component: FilesharedocComponent;
  let fixture: ComponentFixture<FilesharedocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilesharedocComponent]
    });
    fixture = TestBed.createComponent(FilesharedocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
