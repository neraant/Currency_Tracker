import { ENV } from '@utils/env';

import { httpClient } from './httpClient';

export const currencyApiClient = new httpClient({
  baseURL: ENV['CURRENCY_API_BASE_URL'],
  headers: {
    'Content-Type': 'application/json',
  },
});

export const twelveDataClient = new httpClient({
  baseURL: ENV['TWELVEDATA_API_BASE_URL'],
  headers: {
    'Content-Type': 'application/json',
  },
});
