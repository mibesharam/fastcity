/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActionPendingService } from './action-pending.service';

describe('Service: ActionPending', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionPendingService]
    });
  });

  it('should ...', inject([ActionPendingService], (service: ActionPendingService) => {
    expect(service).toBeTruthy();
  }));
});
