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
    addActivity(): void {
        console.log('add activity');
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
    }
    openTime() {
        this.showTime = true;
    }
    closeTime() {
        this.showTime = false;
    }
}
