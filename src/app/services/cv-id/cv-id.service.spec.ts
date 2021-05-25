import { TestBed } from '@angular/core/testing';

import { CvIdService } from './cv-id.service';

describe('CvIdService', () => {
  let service: CvIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
