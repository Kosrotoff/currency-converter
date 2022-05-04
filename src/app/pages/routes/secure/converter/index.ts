import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {ServiceSettings} from '../../../../services/settings';
import {CurrencyService} from '../../../../services/currency';


@Component({
    selector: 'converter-page',
    providers: [],
    templateUrl: './resources/template.html',
    styleUrls: ['./resources/styles.css']
})
export class ConverterPage {
    public listCurrencies: Array<{ charCode: string, name: string, value: number }> = [];
    public amountCurrencyTop = 0;
    public amountCurrencyBottom = 0;

    private selectedCurrencyTop: any;
    private selectedCurrencyBottom: any;

    constructor(
        public router: Router,
        public settings: ServiceSettings,
        private currency: CurrencyService
    ) {
       this.update();
    }


    public update() {
        this.currency.getCurrency()
            .then((data: any) => {
                this.listCurrencies = Object.values(data).map((item: any) => ({
                    charCode: item.CharCode,
                    name: item.Name,
                    value: item.Value
                }));
                this.listCurrencies.push({
                    charCode: 'RUB',
                    name: 'Российский рубль',
                    value: 1
                })

                this.selectedCurrencyTop = this.listCurrencies[0];
                this.selectedCurrencyBottom = this.listCurrencies[0];
            });
    }

    public selectCurrencyTop(event: any) {
        this.selectedCurrencyTop = event;
    }

    public selectCurrencyBottom(event: any) {
        this.selectedCurrencyBottom = event;
    }

    public calcAmountCurrencyTop(event: any) {
        this.update();
        this.amountCurrencyTop = this.selectedCurrencyBottom.value * this.amountCurrencyBottom;
        this.amountCurrencyTop = Math.round(this.amountCurrencyTop * 100) / 100;
    }

    public calcAmountCurrencyBottom(event: any) {
        this.update();
        this.amountCurrencyBottom = this.selectedCurrencyTop.value.toString() * this.amountCurrencyTop;
        this.amountCurrencyBottom = Math.round(this.amountCurrencyBottom * 100) / 100;
    }
}