import { ActivityAddEvent } from './../models/activityAddEvent';
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
    private _timeslotAddObserver: Observer<TimeslotAddEvent>;

    ActivityAddObservable: Observable<ActivityAddEvent>;
    private _activityAddObserver: Observer<ActivityAddEvent>;

    constructor(private networkCalls: NetworkCalls) {
        this.MessageObservable = new Observable<Message>(observer =>
        this._messageObserver = observer).share();

        this.ActivityVoteObservable = new Observable<ActivityVoteEvent>(observer =>
        this._activityVoteObserver = observer).share();

        this.TimeslotVoteObservable = new Observable<TimeslotVoteEvent>(observer =>
        this._timeslotVoteObserver = observer).share();

        this.TimeslotAddObservable = new Observable<TimeslotAddEvent>(observer =>
        this._timeslotAddObserver = observer).share();

        this.ActivityAddObservable = new Observable<ActivityAddEvent>(observer => 
        this._activityAddObserver = observer).share();


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
            this.onTimeslotAdded(groupId, timeslot);
        });
        this.socket.on('activityAdded', (groupId: String, activity: Activity) => {
            this.onActivityAdded(groupId, activity);
        });
    }
    private sendAuthCredentials(): void {
        this.socket.emit('auth', {acces_token: localStorage.getItem('access_token')});
    }
    private onMessage(message: Message, groupId: String): void {
        message.groupId = groupId;
        this._messageObserver.next(message);
    }
    public sendMesage(groupId: String, messageContentText: String) {
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
    private onTimeslotAdded(groupId: String, timeslot: TimeSlot) {
        const event = new TimeslotAddEvent();
        event.groupId = groupId;
        event.timeslot = timeslot;
        this._timeslotAddObserver.next(event);
    }
    private onActivityAdded(groupId: String, activity: Activity) {
        const event = new ActivityAddEvent();
        event.groupId = groupId;
        event.activity = activity;
        this._activityAddObserver.next(event);
    }
}
