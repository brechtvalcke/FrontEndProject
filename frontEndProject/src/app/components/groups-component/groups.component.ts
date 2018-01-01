import {Component, OnInit} from '@angular/core';
import {Group} from '../../models/group';
import {GroupService} from '../../services/group.service';

@Component({
    selector: 'groups-component',
    templateUrl: 'groups.component.html',
    styleUrls: ['groups.component.scss']
})

export class GroupsComponent implements OnInit {
    group: Group;
    groupID: string;
    activeTab = 1;
    constructor(private groupService: GroupService) { }

    ngOnInit() {
        this.getGroup();
    }
    private getGroup() {
        this.groupService.getGroup(this.groupID)
            .then(group => this.group = group)
            .catch(error => console.log(error));
    }
    changeTab(event: Event) {
    }
}
