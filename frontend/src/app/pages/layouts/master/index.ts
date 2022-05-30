import {Component} from '@angular/core';
import AuthService from '../../../services/auth';


@Component({
    selector: 'master-layout',
    providers: [],
    templateUrl: './resources/template.html',
    styleUrls: ['./resources/styles.css']
})
export class MasterLayout {
    constructor(
        private auth: AuthService
    ) {
    }

    // ----- [ PUBLIC METHODS ] ----------------------------------------------------------------------------------------

    public isAuthenticated(): boolean {
        return this.auth.isAuthenticated();
    }

    public logout(): void {
        this.auth.logout();
    }
}
