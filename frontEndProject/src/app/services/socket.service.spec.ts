import { SocketService } from './socket.service';
import { TestBed, async } from '@angular/core/testing';
import { NetworkCalls } from '../global/networkCalls';

describe('socket service', () => {
    let socketService: SocketService;
    beforeEach(async(() => {
        socketService = new SocketService(new NetworkCalls());
      }));
    it('should connect with socket quickly when connect is called', () => {
        socketService.connect();
        setTimeout(() => {
            expect(socketService.socket.connected).toBeTruthy();
        }, 200);
    });
});
