import { Router , ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'activity-picker-component',
    templateUrl: 'activityPicker.component.html',
    styleUrls: ['activityPicker.component.scss']
})

export class ActivityPickerComponent implements OnInit {
    activityName = '';
    @Output() close = new EventEmitter();
    @Output() activity = new EventEmitter();
    ngOnInit() {}
    closePopUp() {
        this.activityName = '';
        this.close.emit(true);
    }
    saveActivity() {
        this.activity.emit(this.activityName);
        this.closePopUp();
    }
}
