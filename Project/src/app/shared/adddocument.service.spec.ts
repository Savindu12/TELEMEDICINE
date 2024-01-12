import { TestBed } from '@angular/core/testing';

import { AdddocumentService } from './adddocument.service';

describe('AdddocumentService', () => {
  let service: AdddocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdddocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
