import {Component} from '@angular/core';

import CurrencyConversionService from '../../../../services/currency-conversion';


@Component({
    selector: 'converter-page',
    providers: [],
    templateUrl: './resources/template.html',
    styleUrls: ['./resources/styles.css']
})
export class ConverterPage {
    constructor(
        private currencyConverter: CurrencyConversionService
    ) {
    }
}
