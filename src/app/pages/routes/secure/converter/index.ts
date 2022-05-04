import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {ServiceSettings} from '../../../../services/settings';


@Component({
    selector: 'converter-page',
    providers: [],
    templateUrl: './resources/template.html',
    styleUrls: ['./resources/styles.css']
})
export class ConverterPage {
    constructor(
        public router: Router,
        public settings: ServiceSettings
    ) {
    }
}