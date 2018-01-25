import { NetworkCalls } from './../global/networkCalls';
import { UserTyping } from './../models/UserTyping';
import { Group } from './../models/group';
import { ActivityAddEvent } from './../models/activityAddEvent';
import { TimeslotVoteEvent } from './../models/timeslotVoteEvent';
import { TimeSlot } from './../models/timeSlot';
import { ActivityVoteEvent } from './../models/activityVoteEvent';
import { Observable } from 'rxjs/Observable';
import { Message } from './../models/message';
import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import { Activity } from '../models/activity';
import { TimeslotAddEvent } from '../models/timeslotAddEvent';

@Injectable()
export class InterComponentCommunicationService {

    InviteAcceptedOrDeclined: Observable<any>;
    private _inviteAcceptedOrDeclined: Observer<any>;

    constructor() {
        this.InviteAcceptedOrDeclined = new Observable<any>(observer =>
        this._inviteAcceptedOrDeclined = observer).share();
    }
    sendAcceptedOrDeclined(accepted) {
        this._inviteAcceptedOrDeclined.next(accepted);
    }

}
