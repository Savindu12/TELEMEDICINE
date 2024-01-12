import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesharepatComponent } from './filesharepat.component';

describe('FilesharepatComponent', () => {
  let component: FilesharepatComponent;
  let fixture: ComponentFixture<FilesharepatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilesharepatComponent]
    });
    fixture = TestBed.createComponent(FilesharepatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
