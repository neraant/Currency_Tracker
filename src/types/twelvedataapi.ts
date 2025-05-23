export interface TwelveDataDetails {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface TwelveDataApiResponse {
  values: TwelveDataDetails[];
  [code: string]: any;
}
