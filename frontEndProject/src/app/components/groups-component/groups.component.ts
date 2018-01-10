import { ActivityAddEvent } from './../../models/activityAddEvent';
import { TimeSlot } from './../../models/timeSlot';
import { ActivityVoteEvent } from './../../models/activityVoteEvent';
import { SocketService } from './../../services/socket.service';
import { Router , ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import { Group } from './../../models/group';
import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../services/group.service';
import { Activity } from '../../models/activity';
import { TimeslotVoteEvent } from '../../models/timeslotVoteEvent';
import { TimeslotAddEvent } from '../../models/timeslotAddEvent';

@Component({
    selector: 'groups-component',
    templateUrl: 'groups.component.html',
    styleUrls: ['groups.component.scss']
})

export class GroupsComponent implements OnInit {
    groups: [Group];
    selectedGroup: Group = new Group();
    activeTab = 1;
    routeSubscription: any;

    activityVoteSubscription: any;
    timeslotVoteSubscription: any;

    activityAddSubscription: any;
    timeslotAddSubscription: any;

    constructor(private groupService: GroupService,
        private router: Router,
        private route: ActivatedRoute,
        private socketService: SocketService
        ) {}

    ngOnInit() {
        this.getGroups();
        this.routeSubscription = this.route.params.subscribe(params => {
            if (params['id']) {
                this.groupService.getGroup(params['id'])
                .then((group: Group) => {
                    this.selectedGroup = group;
                })
                .catch((err) => {
                    console.log(err);
                });
            }else {
                if (window.innerWidth <= 700) {
                    this.activeTab = 0;
                }
            }
        });
        this.activityVoteSubscription = this.socketService.ActivityVoteObservable.subscribe((event: ActivityVoteEvent) => {
                if (this.selectedGroup._id === event.groupId) {
                    this.selectedGroup.activity.forEach((activity: Activity) => {
                        if (activity._id === event.activityId) {
                            console.log(activity.votes.includes(event.userId));
                            if (activity.votes.includes(event.userId)) {
                                activity.votes.splice(activity.votes.indexOf( event.userId), 1);
                            }else {
                                activity.votes.push(event.userId);
                            }
                            console.log(activity.votes);
                        }
                    });
                }
            });
        this.timeslotVoteSubscription = this.socketService.TimeslotVoteObservable.subscribe((event: TimeslotVoteEvent) => {
            if (this.selectedGroup._id === event.groupId) {
                this.selectedGroup.timeSlot.forEach((timeslot: TimeSlot) => {
                    if (timeslot._id === event.timeslotId) {
                        console.log(timeslot.votes.includes(event.userId));
                        if (timeslot.votes.includes(event.userId)) {
                            timeslot.votes.splice(timeslot.votes.indexOf(event.userId), 1);
                        }else {
                            timeslot.votes.push(event.userId);
                        }
                        console.log(timeslot.votes);
                    }
                });
            }
        });
        this.activityAddSubscription = this.socketService.ActivityAddObservable.subscribe((event: ActivityAddEvent) => {
            if (this.selectedGroup._id === event.groupId) {
                this.selectedGroup.activity.push(event.activity);
            }
        });
        this.timeslotAddSubscription = this.socketService.TimeslotAddObservable.subscribe((event: TimeslotAddEvent) => {
            if (this.selectedGroup._id === event.groupId) {
                this.selectedGroup.timeSlot.push(event.timeslot);
            }
        });
    }
    GroupClicked(group: Group) {
        this.router.navigate(['dashboard/group', group._id]);
    }
    private getGroups() {
        this.groupService.getAllGroups()
            .then(groups => {
                this.groups = groups['groupList'];
                const activatedRouteSnapshot: ActivatedRouteSnapshot = this.route.snapshot;
                if (activatedRouteSnapshot.params['id'] === undefined && window.innerWidth > 700) {
                    this.router.navigate(['dashboard/group', this.groups[0]._id]);
                }

            })
            .catch(error => console.log(error));
    }
    changeTab(event: String) {
        switch (event) {
            case 'chat' :
                this.activeTab = 1;
                break;
            case 'detail' :
                this.activeTab = 2;
                break;
            default:
                this.activeTab = 0;
                break;
        }
    }
}
