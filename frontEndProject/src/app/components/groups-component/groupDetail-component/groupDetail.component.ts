import {Component, Input} from '@angular/core';
import {Group} from '../../../models/group';

@Component({
    selector: 'group-detail-component',
    templateUrl: 'groupDetail.component.html',
    styleUrls: ['groupDetail.component.scss']
})

export class GroupDetailComponent {
    @Input() group: Group;
}
