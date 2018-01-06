import { Group } from './../../../models/group';
import { Component, Input, OnInit } from '@angular/core';
import { TimeSlot } from '../../../models/timeSlot';

@Component({
    selector: 'group-detail-component',
    templateUrl: 'groupDetail.component.html',
    styleUrls: ['groupDetail.component.scss']
})

export class GroupDetailComponent implements OnInit {
    showActivity = false;
    showTime = false;
    @Input() group: Group;
    voteTimeslot(timeslot: TimeSlot): void {

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
