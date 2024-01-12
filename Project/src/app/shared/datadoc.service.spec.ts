import { TestBed } from '@angular/core/testing';

import { DatadocService } from './datadoc.service';

describe('DatadocService', () => {
  let service: DatadocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatadocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
