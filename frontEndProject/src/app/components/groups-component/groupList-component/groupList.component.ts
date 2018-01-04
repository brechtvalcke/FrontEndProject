import {Component, OnInit} from '@angular/core';
import {Group} from '../../../models/group';
import {GroupService} from '../../../services/group.service';

@Component({
    selector: 'group-list-component',
    templateUrl: 'groupList.component.html',
    styleUrls: ['groupList.component.scss']
})

export class GroupListComponent implements OnInit {
    groups: [Group];
    constructor(private groupService: GroupService) { }

    ngOnInit() {
        this.getGroups();
    }
    private getGroups() {
        this.groupService.getAllGroups()
            .then(groups => {
                console.log(groups['groupList']);
                this.groups = groups['groupList'];
            })
            .catch(error => console.log(error));
    }
    log(iets:any) {
        console.log(iets);
    }
}
