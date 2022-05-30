import {Component, OnDestroy, OnInit} from '@angular/core';

import {CurrencyConversionService, CurrencyList} from '../../../../services/currency-conversion';
import {Subscription} from 'rxjs';


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

    private converLefttSub: Subscription;
    private converRighttSub: Subscription;
    private getCurrencyListSub: Subscription;
    private selectedCurrencyLeft: any;
    private selectedCurrencyRight: any;


    // ----- [ PUBLIC PROPERTIES ] -------------------------------------------------------------------------------------

    public currencyList: CurrencyList;
    public amountCurrencyLeft: number;
    public amountCurrencyRight: number;
    public errorMessage: string;


    // ----- [ PRIVATE METHODS ] ---------------------------------------------------------------------------------------

    private convert(): void {
        //this.convertSub = this.currencyConverter.convert();
    }


    // ----- [ LIFECYCLE EVENTS ] --------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this.amountCurrencyLeft = 0;
        this.amountCurrencyRight = 0;
        this.errorMessage = '';

        this.getCurrencyListSub = this.currencyConverter.getCurrencyList().subscribe({
            next: (currencyList: CurrencyList): void => {
                this.currencyList = currencyList;
                this.selectedCurrencyLeft = this.currencyList.items[0];
                this.selectedCurrencyRight = this.currencyList.items[0];

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
        if (this.converLefttSub) {
            this.converLefttSub.unsubscribe();
        }
        if (this.converRighttSub) {
            this.converRighttSub.unsubscribe();
        }
        if (this.getCurrencyListSub) {
            this.getCurrencyListSub.unsubscribe();
        }
    }


    // ----- [ PUBLIC METHODS ] ----------------------------------------------------------------------------------------

    public selectCurrencyLeft(event: any) {
        this.selectedCurrencyLeft = event
        this.calcAmountCurrencyRight();
    }

    public selectCurrencyRight(event: any) {
        this.selectedCurrencyRight = event;
        this.calcAmountCurrencyRight();
    }

    public calcAmountCurrencyLeft() {
        this.converLefttSub = this.currencyConverter.convert(this.selectedCurrencyRight.code, this.amountCurrencyRight, this.selectedCurrencyLeft.code)
            .subscribe({
                next: (result) => {
                    this.amountCurrencyLeft = result.amount;
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

    public calcAmountCurrencyRight() {
        this.converRighttSub = this.currencyConverter.convert(this.selectedCurrencyLeft.code, this.amountCurrencyLeft, this.selectedCurrencyRight.code)
            .subscribe({
                next: (result) => {
                    this.amountCurrencyRight = result.amount;
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
