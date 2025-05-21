import { CurrencyCode } from './currency';

export interface BankDetail {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  currencies: CurrencyCode[];
}
