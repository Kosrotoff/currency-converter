import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';


export type CurrencyData = {
    [key: string]: {
        CharCode: string;
        ID: string;
        Name: string;
        Nominal: number;
        NumCode: string;
        Previous: number;
        Value: number;
    };
};

export type ConversionResult = {
    dataRelevance: boolean;
    amount: number;
};

export type CurrencyList = {
    dataRelevance: boolean;
    items: CurrencyListItem[];
};

export type CurrencyListItem = {
    code: string;
    name: string;
};


@Injectable()
export class CurrencyConversionService {
    constructor(
        private httpClient: HttpClient
    ) {
        this.lastRequestTime = 0;
    }


    // ----- [ PRIVATE PROPERTIES ] ------------------------------------------------------------------------------------

    private data: CurrencyData;
    private lastRequestTime: number;


    // ----- [ PRIVATE METHODS ] ---------------------------------------------------------------------------------------

    private updateData(): Promise<CurrencyData> {
        if (this.data && (Date.now() - this.lastRequestTime < environment.delayBetweenRequestsToCrb)) {
            return Promise.resolve(this.data);
        }

        return new Promise<CurrencyData>((resolve, reject) => {
            this.lastRequestTime = Date.now();
            this.httpClient.get('https://www.cbr-xml-daily.ru/daily_json.js')
                .subscribe(
                    {
                        next: (data: any): void => {
                            this.data = Object.assign({
                                RUB: {
                                    CharCode: 'RUB',
                                    ID: 'none',
                                    Name: 'Российский рубль',
                                    Nominal: 1,
                                    NumCode: "643",
                                    Previous: 1,
                                    Value: 1
                                }
                            }, data.Valute);

                            resolve(this.data);
                        },
                        error: error => {
                            reject(error)
                        }
                    }
                );
        });
    }

    private _getCurrencyList(data: CurrencyData, dataRelevance: boolean): CurrencyList {
        return {
            dataRelevance,
            items: Object.entries(data).map(([code, info]) => ({
                code,
                name: info.Name
            }))
        };
    }

    private _convert(data: CurrencyData, currencyCodeIn: string, amount: number, currencyCodeTo: string, dataRelevance: boolean): ConversionResult {
        const currencyIn = data[currencyCodeIn];
        const currencyTo = data[currencyCodeTo];
        const amountInRub = (currencyIn.Value / currencyIn.Nominal) * amount;

        return {
            dataRelevance,
            amount: amountInRub / (currencyTo.Value / currencyTo.Nominal)
        };
    }


    // ----- [ PUBLIC METHODS ] ----------------------------------------------------------------------------------------

    public getCurrencyList(): Observable<CurrencyList> {
        return new Observable<CurrencyList>((observer) => {
            this.updateData()
                .then((data: CurrencyData): void => {
                    observer.next(this._getCurrencyList(data, true))
                    observer.complete();
                })
                .catch(error => {
                    if (this.data) {
                        observer.next(this._getCurrencyList(this.data, false))
                    } else {
                        observer.error(new Error(error));
                    }
                    observer.complete();
                });
        });
    }

    public convert(currencyCodeIn: string, amount: number, currencyCodeTo: string): Observable<ConversionResult> {
        return new Observable<ConversionResult>((observer) => {
            this.updateData()
                .then((data: CurrencyData): void => {
                    observer.next(this._convert(data, currencyCodeIn, amount, currencyCodeTo, true))
                    observer.complete();
                })
                .catch(error => {
                    if (this.data) {
                        observer.next(this._convert(this.data, currencyCodeIn, amount, currencyCodeTo, false))
                    } else {
                        observer.error(new Error(error));
                    }
                    observer.complete();
                });
        });
    }
}
