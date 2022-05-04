import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {ServiceSettings} from '../../../../../services/settings';


@Component({
    selector: 'signup-page',
    providers: [],
    templateUrl: './resources/template.html',
    styleUrls: ['./resources/styles.css']
})
export class SignupPage {
    constructor(
        public router: Router,
        public settings: ServiceSettings
    ) {
    }
}