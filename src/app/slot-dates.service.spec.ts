import { TestBed } from '@angular/core/testing';

import { SlotsService } from './slots.service';

describe('SlotDatesService', () => {
  let service: SlotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
