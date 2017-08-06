import { TestBed, inject } from '@angular/core/testing';

import { BotFrameworkService } from './bot-framework.service';

describe('BotFrameworkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BotFrameworkService]
    });
  });

  it('should be created', inject([BotFrameworkService], (service: BotFrameworkService) => {
    expect(service).toBeTruthy();
  }));
});
