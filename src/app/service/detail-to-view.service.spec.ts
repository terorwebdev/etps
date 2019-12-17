import { TestBed } from '@angular/core/testing';

import { DetailToViewService } from './detail-to-view.service';

describe('DetailToViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailToViewService = TestBed.get(DetailToViewService);
    expect(service).toBeTruthy();
  });
});
