import { Group } from './../../../models/group';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'group-detail-component',
    templateUrl: 'groupDetail.component.html',
    styleUrls: ['groupDetail.component.scss']
})

export class GroupDetailComponent implements OnInit {
    @Input() group: Group;
    ngOnInit() {
    }
}
