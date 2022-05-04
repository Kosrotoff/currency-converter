import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {ServiceSettings} from '../../services/settings';


@Component({
    selector: 'master-page',
    providers: [],
    templateUrl: './resources/template.html',
    styleUrls: ['./resources/styles.css']
})
export class MasterPage {
    constructor(
        public router: Router,
        public settings: ServiceSettings
    ) {}

    public signOut() {
        this.settings.isAuthorized = false;
        this.router.navigateByUrl('/');
    }
}