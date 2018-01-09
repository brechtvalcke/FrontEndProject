import { TimeslotVoteEvent } from './../models/timeslotVoteEvent';
import { TimeSlot } from './../models/timeSlot';
import { ActivityVoteEvent } from './../models/activityVoteEvent';
import { Observable } from 'rxjs/Observable';
import { Message } from './../models/message';
import { NetworkCalls } from './../global/networkCalls';
import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import { Activity } from '../models/activity';
import { TimeslotAddEvent } from '../models/timeslotAddEvent';

@Injectable()
export class SocketService {
    private socket;

    MessageObservable: Observable<Message>;
    private _messageObserver: Observer<Message>;

    ActivityVoteObservable: Observable<ActivityVoteEvent>;
    private _activityVoteObserver: Observer<ActivityVoteEvent>;

    TimeslotVoteObservable: Observable<TimeslotVoteEvent>;
    private _timeslotVoteObserver: Observer<TimeslotVoteEvent>;

    TimeslotAddObservable: Observable<TimeslotAddEvent>;
    private _timeslotAddEvent: Observer<TimeslotVoteEvent>;

    constructor(private networkCalls: NetworkCalls) {
        this.MessageObservable = new Observable<Message>(observer =>
        this._messageObserver = observer).share();

        this.ActivityVoteObservable = new Observable<ActivityVoteEvent>(observer =>
        this._activityVoteObserver = observer).share();

        this.TimeslotVoteObservable = new Observable<TimeslotVoteEvent>(observer =>
        this._timeslotVoteObserver = observer).share();
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
        this.socket.on('activityVoted', (groupId: String, timeslotId: String, userId: String) => {
            this.onActivityVoted(groupId, timeslotId, userId);
        });
        this.socket.on('timeslotVoted', (groupId: String, timeslotId: String, userId: String) => {
            this.onTimeslotVoted(groupId, timeslotId, userId);
        });
        this.socket.on('timeslotAdded', (groupId: String, timeslot: TimeSlot) => {
            console.log(timeslot);
        });
        this.socket.on('activityAdded',(groupId: String, activity: Activity) => {
            console.log(activity);
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
    private onActivityVoted(groupId: String, activityId: String, userId: String): void {
        const event: ActivityVoteEvent = new ActivityVoteEvent();
        event.groupId = groupId;
        event.activityId = activityId;
        event.userId = userId;
        this._activityVoteObserver.next(event)
    }
    private onTimeslotVoted(groupId: String, timeslotId: String, userId: String) {
        const event: TimeslotVoteEvent = new TimeslotVoteEvent();
        event.groupId = groupId;
        event.timeslotId = timeslotId;
        event.userId = userId;
        this._timeslotVoteObserver.next(event);
    }
}
