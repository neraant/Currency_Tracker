export enum CurrencyCode {
  USD = 'USD',
  EUR = 'EUR',
  JPY = 'JPY',
  ARS = 'ARS',
  AUD = 'AUD',
  BTC = 'BTC',
  CAD = 'CAD',
  CNY = 'CNY',
  GBP = 'GBP',
}

export enum CacheCode {
  CACHE_CURRENCIES = 'CACHE_CURRENCIES',
}

export const MAX_PARSED_VALUE = 1_000_000;

export interface Currency {
  code: CurrencyCode;
  name: string;
  icon: string;
  value: number;
  formattedValue: string;
}

export interface CurrencyDetail {
  code: string;
  value: number;
  [key: string]: any;
}

export interface CurrencyApiResponse {
  data: {
    [code: string]: CurrencyDetail;
  };
  meta?: {
    last_updated_at?: string;
  };
}

export interface FormattedCurrencyData {
  currencies: Currency[];
  last_updated_at?: string;
}
