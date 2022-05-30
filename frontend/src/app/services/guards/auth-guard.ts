import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';

import AuthService from '../auth';


@Injectable()
export default class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthService
    ) {
    }


    // ----- [ PRIVATE PROPERTIES ] ------------------------------------------------------------------------------------

    public canActivate(): boolean {
        return this.auth.isAuthenticated();
    }
}
