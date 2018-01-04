import { FbService } from './../../../services/fb.service';
import {Component} from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
@Component({
    selector: 'navigation-logged-out-component',
    templateUrl: 'navigationLoggedOut.component.html',
    styleUrls: ['navigationLoggedOut.component.scss'],
    providers: [FbService]
})

export class NavigationLoggedOutComponent {
    constructor(private fbService: FbService, private router: Router) {}

    LogInClicked(event: any): void {
        this.fbService.login().then(result => {
            this.router.navigate(['']);
        });
    }

}
