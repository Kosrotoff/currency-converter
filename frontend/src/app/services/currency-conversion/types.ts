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
