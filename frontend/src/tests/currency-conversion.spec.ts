import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {ConversionResult, CurrencyList, CurrencyConversionService} from '../app/services/currency-conversion';

import {environment} from '../environments/environment';

import cbrResponse from './cbrResponse';


const currencyData = Object.assign({
    RUB: {
        CharCode: 'RUB',
        ID: 'none',
        Name: 'Российский рубль',
        Nominal: 1,
        NumCode: "643",
        Previous: 1,
        Value: 1
    }
}, cbrResponse.Valute);


describe('Сервис конвертации валют', () => {
    let service: CurrencyConversionService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CurrencyConversionService]
        });

        service = TestBed.inject(CurrencyConversionService);
        httpMock = TestBed.inject(HttpTestingController);
    });


    it('должен создавать экземпляр класса', () => {
        expect(service).toBeTruthy();
    });

    it('должен использовать кэшированные данные, при частых запросах', (done) => {
        let actualCurrencyList: CurrencyList;

        service.getCurrencyList()
            .subscribe({
                next: (currencyList) => {
                    actualCurrencyList = currencyList;
                },
                complete: () => {
                    expect(actualCurrencyList).toEqual({
                        dataRelevance: true,
                        items: Object.entries(currencyData).map(([code, info]) => ({
                            code,
                            name: info.Name
                        }))
                    });
                }
            });

        setTimeout(() => {
            service.getCurrencyList()
                .subscribe({
                    next: (currencyList) => {
                        actualCurrencyList = currencyList;
                    },
                    complete: () => {
                        expect(actualCurrencyList).toEqual({
                            dataRelevance: true,
                            items: Object.entries(currencyData).map(([code, info]) => ({
                                code,
                                name: info.Name
                            }))
                        });
                        done();
                    }
                });
        }, 1000);

        httpMock.expectOne('https://www.cbr-xml-daily.ru/daily_json.js').flush(cbrResponse);
        httpMock.verify();
    });

    it('должен возвращать актуальный список валют', (done) => {
        let actualCurrencyList: CurrencyList;

        service.getCurrencyList()
            .subscribe({
                next: (currencyList) => {
                    actualCurrencyList = currencyList;
                },
                complete: () => {
                    expect(actualCurrencyList).toEqual({
                        dataRelevance: true,
                        items: Object.entries(currencyData).map(([code, info]) => ({
                            code,
                            name: info.Name
                        }))
                    });
                    done();
                }
            });

        httpMock.expectOne('https://www.cbr-xml-daily.ru/daily_json.js').flush(cbrResponse);
        httpMock.verify();
    });

    it('должен возвращать не актуальный список валют, если не получилось обновить данные', (done) => {
        let actualCurrencyList: CurrencyList;

        service.getCurrencyList()
            .subscribe({
                next: (currencyList) => {
                    actualCurrencyList = currencyList;
                },
                complete: () => {
                    expect(actualCurrencyList).toEqual({
                        dataRelevance: true,
                        items: Object.entries(currencyData).map(([code, info]) => ({
                            code,
                            name: info.Name
                        }))
                    });
                }
            });

        httpMock.expectOne('https://www.cbr-xml-daily.ru/daily_json.js').flush(cbrResponse);
        httpMock.verify();

        setTimeout(() => {
            service.getCurrencyList()
                .subscribe({
                    next: (currencyList) => {
                        actualCurrencyList = currencyList;
                    },
                    complete: () => {
                        expect(actualCurrencyList).toEqual({
                            dataRelevance: false,
                            items: Object.entries(currencyData).map(([code, info]) => ({
                                code,
                                name: info.Name
                            }))
                        });
                        done();
                    }
                });

            httpMock.expectOne('https://www.cbr-xml-daily.ru/daily_json.js').flush(null, {
                status: 400,
                statusText: "Bad Request"
            });
            httpMock.verify();
        }, environment.delayBetweenRequestsToCrb);
    }, environment.delayBetweenRequestsToCrb + 1000);

    it('должен конвертировать валюту на основе актуальных данных', (done) => {
        let actualConversionResult: ConversionResult;

        service.convert('KZT', 500, 'RUB')
            .subscribe({
                next: (conversionResult) => {
                    actualConversionResult = conversionResult;
                },
                complete: () => {
                    expect(actualConversionResult).toEqual({
                        dataRelevance: true,
                        amount: 78.6745
                    });
                    done();
                }
            });

        httpMock.expectOne('https://www.cbr-xml-daily.ru/daily_json.js').flush(cbrResponse);
        httpMock.verify();
    });

    it('должен конвертировать валюту на основе неактуальных данных, если не получилось обновить данные', (done) => {
        let actualConversionResult: ConversionResult;

        service.convert('KZT', 500, 'RUB')
            .subscribe({
                next: (conversionResult) => {
                    actualConversionResult = conversionResult;
                },
                complete: () => {
                    expect(actualConversionResult).toEqual({
                        dataRelevance: true,
                        amount: 78.6745
                    });
                }
            });

        httpMock.expectOne('https://www.cbr-xml-daily.ru/daily_json.js').flush(cbrResponse);
        httpMock.verify();

        setTimeout(() => {
            service.convert('KZT', 500, 'RUB')
                .subscribe({
                    next: (conversionResult) => {
                        actualConversionResult = conversionResult;
                    },
                    complete: () => {
                        expect(actualConversionResult).toEqual({
                            dataRelevance: false,
                            amount: 78.6745
                        });
                        done();
                    }
                });

            httpMock.expectOne('https://www.cbr-xml-daily.ru/daily_json.js').flush(null, {
                status: 400,
                statusText: "Bad Request"
            });
            httpMock.verify();
        }, environment.delayBetweenRequestsToCrb)
    }, environment.delayBetweenRequestsToCrb + 1000);
});
