import { ActivityVoteEvent } from './../../../models/activityVoteEvent';
import { SocketService } from './../../../services/socket.service';
import { TimeslotService } from './../../../services/timeslot.service';
import { ActivityService } from './../../../services/activity.service';
import { Activity } from './../../../models/activity';
import { Group } from './../../../models/group';
import { Component, Input, OnInit } from '@angular/core';
import { TimeSlot } from '../../../models/timeSlot';

@Component({
    selector: 'group-detail-component',
    templateUrl: 'groupDetail.component.html',
    styleUrls: ['groupDetail.component.scss']
})

export class GroupDetailComponent implements OnInit {
    constructor(private activityService: ActivityService, private timeslotService: TimeslotService){}
    showActivity = false;
    showTime = false;
    @Input() group: Group;

    voteTimeslot(timeslot: TimeSlot): void {
        this.timeslotService.voteTimeslot(this.group._id, timeslot._id);
    }
    voteActivity(activity: Activity): void {
        this.activityService.voteActivity(this.group._id, activity._id);
    }
    ngOnInit() {

    }
    openActivity() {
        this.showActivity = true;
    }
    closeActivity() {
        this.showActivity = false;
    }
    newActivity(name: string) {
        console.log(name);
        const a: Activity = new Activity();
        a.name = name;
        this.activityService.addActivity(a, this.group._id);
    }
    newTime(time): void {
        const timeSplit = time.split(':');
        const hours = timeSplit[0];
        const minutes = timeSplit[1];
        const dateWithTime = new Date();
        dateWithTime.setHours(hours);
        dateWithTime.setMinutes(minutes);
        dateWithTime.setSeconds(0);
        dateWithTime.setMilliseconds(0);
        const t: TimeSlot = new TimeSlot();
        t.time = dateWithTime;
        this.timeslotService.addTimeslot(t, this.group._id);
    }
    openTime() {
        this.showTime = true;
    }
    closeTime() {
        this.showTime = false;
    }
}
