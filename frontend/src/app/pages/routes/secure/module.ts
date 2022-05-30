import {NgModule} from '@angular/core';

import {SecureRoutingModule} from './routes';

import {ConverterPage} from './converter';


@NgModule({
    declarations: [
        ConverterPage
    ],
    imports: [
        SecureRoutingModule
    ],
})
export class SecureModule {
}
