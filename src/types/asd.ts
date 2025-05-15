export interface Currency {
  code: string;
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
  meta?: any;
}
