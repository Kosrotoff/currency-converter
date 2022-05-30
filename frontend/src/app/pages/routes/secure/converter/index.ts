import {Component, OnDestroy, OnInit} from '@angular/core';

import {CurrencyConversionService, CurrencyList} from '../../../../services/currency-conversion';
import {Subscription} from 'rxjs';

import {CurrencyListItem} from '../../../../services/currency-conversion/types';


@Component({
    selector: 'converter-page',
    providers: [],
    templateUrl: './resources/template.html',
    styleUrls: ['./resources/styles.css']
})
export class ConverterPage implements OnInit, OnDestroy {
    constructor(
        private currencyConverter: CurrencyConversionService
    ) {
    }


    // ----- [ PRIVATE PROPERTIES ] ------------------------------------------------------------------------------------

    private convertSub: Subscription;
    private getCurrencyListSub: Subscription;
    private selectedCurrencyTop: any;
    private selectedCurrencyBottom: any;


    // ----- [ PUBLIC PROPERTIES ] -------------------------------------------------------------------------------------

    public currencyList: CurrencyList;
    public amountCurrencyTop: number;
    public amountCurrencyBottom: number;
    public errorMessage: string;


    // ----- [ PRIVATE METHODS ] ---------------------------------------------------------------------------------------

    private convert(): void {
        //this.convertSub = this.currencyConverter.convert();
    }


    // ----- [ LIFECYCLE EVENTS ] --------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this.amountCurrencyTop = 0;
        this.amountCurrencyBottom = 0;
        this.errorMessage = '';

        this.getCurrencyListSub = this.currencyConverter.getCurrencyList().subscribe({
            next: (currencyList: CurrencyList): void => {
                this.currencyList = currencyList;
                this.selectedCurrencyTop = this.currencyList.items[0];
                this.selectedCurrencyBottom = this.currencyList.items[0];

                if (!currencyList.dataRelevance) {
                    this.errorMessage = 'Не удалось обновить данные о курсе валют, для расчётов используются неактуальные данные.';
                } else {
                    this.errorMessage = '';
                }
            },
            error: () => {
                this.errorMessage = 'Не удалось получить данные о курсе валют. Повторите попытку позже.';
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.convertSub) {
            this.convertSub.unsubscribe();
        }
        if (this.getCurrencyListSub) {
            this.getCurrencyListSub.unsubscribe();
        }
    }


    // ----- [ PUBLIC METHODS ] ----------------------------------------------------------------------------------------

    public selectCurrencyTop(event: any) {
        this.selectedCurrencyTop = event
        this.calcAmountCurrencyBottom();
    }

    public selectCurrencyBottom(event: any) {
        this.selectedCurrencyBottom = event;
        this.calcAmountCurrencyBottom();
    }

    public calcAmountCurrencyTop() {
        this.convertSub = this.currencyConverter.convert(this.selectedCurrencyBottom.code, this.amountCurrencyBottom, this.selectedCurrencyTop.code)
            .subscribe({
                next: (result) => {
                    this.amountCurrencyTop = result.amount;
                    if (!result.dataRelevance) {
                        this.errorMessage = 'Не удалось обновить данные о курсе валют, для расчётов используются неактуальные данные.';
                    } else {
                        this.errorMessage = '';
                    }
                },
                error: error => {
                    this.errorMessage = 'Не удалось получить данные о курсе валют.';
                }
            });
    }

    public calcAmountCurrencyBottom() {
        this.convertSub = this.currencyConverter.convert(this.selectedCurrencyTop.code, this.amountCurrencyTop, this.selectedCurrencyBottom.code)
            .subscribe({
                next: (result) => {
                    this.amountCurrencyBottom = result.amount;
                    if (!result.dataRelevance) {
                        this.errorMessage = 'Не удалось обновить данные о курсе валют, для расчётов используются неактуальные данные.';
                    } else {
                        this.errorMessage = '';
                    }
                },
                error: error => {
                    this.errorMessage = 'Не удалось получить данные о курсе валют.';
                }
            });
    }
}
