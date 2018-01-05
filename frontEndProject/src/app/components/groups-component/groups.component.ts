import { Router , ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import { Group } from './../../models/group';
import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../services/group.service';

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
    constructor(private groupService: GroupService, private router: Router, private route: ActivatedRoute) { }

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
                if (window.screen.width <= 450) {
                    this.activeTab = 0;
                }
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
                if (activatedRouteSnapshot.params['id'] === undefined && window.screen.width > 450) {
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
