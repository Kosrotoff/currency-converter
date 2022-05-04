import {Injectable}             from '@angular/core';


@Injectable()
export class ServiceSettings {
    public isAuthorized: boolean;


    constructor() {
        this.isAuthorized = false;
    }
}