import {NgModule} from '@angular/core';

import {SecureRoutingModule} from './routes';

import {ConverterPage} from './converter';

import CurrencyConversionService from '../../../services/currency-conversion';


@NgModule({
    declarations: [
        ConverterPage
    ],
    imports: [
        SecureRoutingModule
    ],
    providers: [
        CurrencyConversionService
    ]
})
export class SecureModule {
}
