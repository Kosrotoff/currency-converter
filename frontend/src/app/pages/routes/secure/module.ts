import {NgModule} from '@angular/core';

import {SecureRoutingModule} from './routes';

import {ConverterPage} from './converter';

import {CurrencyConversionService} from '../../../services/currency-conversion';

import {DropdownComponent} from '../../../components/dropdown';
import {DropdownCurrencyComponent} from '../../../components/items/dropdown/currency';


@NgModule({
    declarations: [
        ConverterPage,
        DropdownComponent,
        DropdownCurrencyComponent
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
