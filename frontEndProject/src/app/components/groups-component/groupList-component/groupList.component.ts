import { Group } from './../../../models/group';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'group-list-component',
    templateUrl: 'groupList.component.html',
    styleUrls: ['groupList.component.scss']
})

export class GroupListComponent implements OnInit {
    @Input() groups: [Group];
    @Output() groupClicked = new EventEmitter<Group>();
    constructor() { }
    ngOnInit() {
    }

}
