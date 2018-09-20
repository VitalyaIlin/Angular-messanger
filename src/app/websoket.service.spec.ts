import { TestBed, inject } from '@angular/core/testing';

import { WebsocketService } from './websoket.service';

describe('Websoket.ChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebsocketService]
    });
  });

  it('should be created', inject([WebsocketService], (service: WebsocketService) => {
    expect(service).toBeTruthy();
  }));
});
