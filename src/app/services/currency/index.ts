import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


// Чтобы избежать превышения лимита запросов используется кэширование и задержка между запросами.
const TIME_BETWEEN_REQUESTS = 20 * 1000;


@Injectable()
export class CurrencyService {
    private currencyCache: any;
    private lastRequestTime: number;


    constructor(private httpClient: HttpClient) {
        this.currencyCache = [];
        this.lastRequestTime = 0;
    }

    public getCurrency() {
        return new Promise(resolve => {
            if (Date.now() - this.lastRequestTime < TIME_BETWEEN_REQUESTS) {
                resolve(this.currencyCache);
            } else {
                this.lastRequestTime = Date.now();
                this.httpClient.get('https://www.cbr-xml-daily.ru/daily_json.js').subscribe((data: any) => {
                    this.currencyCache = data.Valute;
                    resolve(this.currencyCache);
                });
            }
        });
    }
}