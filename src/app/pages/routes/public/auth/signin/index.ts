import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {ServiceSettings} from '../../../../../services/settings';


@Component({
    selector: 'signin-page',
    providers: [],
    templateUrl: './resources/template.html',
    styleUrls: ['./resources/styles.css']
})
export class SigninPage {
    constructor(
        public router: Router,
        public settings: ServiceSettings
    ) {
        settings.isAuthorized = true;
        router.navigateByUrl('/');
    }
}