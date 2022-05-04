import {Injectable}         from '@angular/core';
import {CanActivate}        from '@angular/router';

import {ServiceSettings}    from '../settings';


@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
    constructor(public settings: ServiceSettings) {
    }

    public canActivate(): boolean {
        return this.settings.isAuthorized;
    }
}