import {Component, OnInit, OnDestroy} from '@angular/core';

import AuthService from '../../services/auth';


@Component({
    selector: 'app',
    templateUrl: './resources/template.html',
    styleUrls: ['./resources/styles.css']
})
export class App implements OnInit, OnDestroy {
    constructor(
        private auth: AuthService
    ) {
    }


    // ----- [ LIFECYCLE EVENTS ] --------------------------------------------------------------------------------------

    public ngOnInit(): void {
        const potentialToken = localStorage.getItem('auth-token');
        if (potentialToken) {
            this.auth.setToken(potentialToken);
        }
    }

    public ngOnDestroy(): void {
        localStorage.clear();
    }
}
