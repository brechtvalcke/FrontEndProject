import { Observable } from 'rxjs/Observable';
import { Message } from './../models/message';
import { NetworkCalls } from './../global/networkCalls';
import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

@Injectable()
export class SocketService {
    private socket;

    MessageObservable: Observable<Message>;
    private _messageObserver: Observer<Message>;

    constructor(private networkCalls: NetworkCalls) {
        this.MessageObservable = new Observable<Message>(observer =>
        this._messageObserver = observer).share();
    }
    connect(): void {
        this.socket = io(this.networkCalls.socketConnect());
        this.initListeners();
    }
    initListeners() {
        this.socket.on('connected', () => {this.sendAuthCredentials(); });
        this.socket.on('authSucces', () => {
            console.log('authSucces');
        });
        this.socket.on('authFailed', () => {
            console.log('authFailed');
        });
        this.socket.on('disconnect', () => {
            console.log('disconnect');
        });
        this.socket.on('message', (message: Message, groupId: String) => {
            this.onMessage(message, groupId);
        });
    }
    private sendAuthCredentials(): void {
        this.socket.emit('auth', {acces_token: localStorage.getItem('access_token')});
    }
    private onMessage(message: Message, groupId: String): void {
        message.groupId = groupId;
        this._messageObserver.next(message);
    }
    public sendMesage(groupId: String, messageContentText: String){
        this.socket.emit('message', groupId, messageContentText);
    }
}
