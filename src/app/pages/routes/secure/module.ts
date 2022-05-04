import {NgModule} from '@angular/core';

import {ProfilePage} from './profile';
import {ConverterPage} from './converter';

import {SecureRoutingModule}    from './routes';


@NgModule({
    declarations: [
        ProfilePage,
        ConverterPage
    ],
    imports: [
        SecureRoutingModule
    ]
})
export class SecureModule {}