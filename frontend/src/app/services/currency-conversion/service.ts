import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable,} from 'rxjs';

import {ConversionResult, CurrencyData, CurrencyList} from './types';


// Чтобы избежать превышения лимита запросов используется кэширование и задержка между запросами.
const TIME_BETWEEN_REQUESTS = 20 * 1000;


@Injectable()
export default class CurrencyConversionService {
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
        if (this.data && (Date.now() - this.lastRequestTime < TIME_BETWEEN_REQUESTS)) {
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
                        error: (error) => reject(new Error(error))
                    }
                );
        });
    }

    private _getCurrencyList(data: CurrencyData): CurrencyList {
        return {
            dataRelevance: (data == this.data),
            items: Object.entries(data).map(([code, info]) => ({
                code,
                name: info.Name
            }))
        };
    }

    private _convert(data: CurrencyData, currencyCodeIn: string, amount: number, currencyCodeTo: string): ConversionResult {
        const currencyIn = data[currencyCodeIn];
        const currencyTo = data[currencyCodeTo];
        const amountInRub = (currencyIn.Value / currencyIn.Nominal) * amount;

        return {
            dataRelevance: (data == this.data),
            amount: amountInRub * (currencyTo.Value / currencyTo.Nominal)
        };
    }


    // ----- [ PUBLIC METHODS ] ----------------------------------------------------------------------------------------

    public getCurrencyList(): Observable<CurrencyList> {
        return new Observable<CurrencyList>((observer) => {
            this.updateData()
                .then((data: CurrencyData): void => {
                    observer.next(this._getCurrencyList(data))
                    observer.complete();
                })
                .catch(error => {
                    if (this.data) {
                        observer.next(this._getCurrencyList(this.data))
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
                    observer.next(this._convert(data, currencyCodeIn, amount, currencyCodeTo))
                    observer.complete();
                })
                .catch(error => {
                    if (this.data) {
                        observer.next(this._convert(this.data, currencyCodeIn, amount, currencyCodeTo))
                    } else {
                        observer.error(new Error(error));
                    }
                    observer.complete();
                });
        });
    }
}
