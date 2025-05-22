import { CurrencyApiResponse, CurrencyDetail } from '@typings/currency';
import { ENV } from '@utils/env';
import { formatCurrencyData } from '@utils/formatCurrencyData';

import { BASE_CURRENCY, CURRENCIES } from '@constants/currencies';

import { currencyApiClient } from './clents';

export const fetchCurrencyData = async () => {
  const currencies = CURRENCIES.join(',');
  try {
    const data = await currencyApiClient.get<CurrencyApiResponse>('', {
      params: {
        apikey: ENV.CURRENCY_API_KEY,
        base_currency: BASE_CURRENCY,
        currencies: currencies,
      },
    });
    return formatCurrencyData(data);
  } catch (error) {
    console.error('Error fetching currencies data:', error);
    throw error;
  }
};

export const convertCurrency = async (from: string | null, to: string) => {
  try {
    return await currencyApiClient.get<CurrencyDetail>('', {
      params: {
        apikey: ENV.CURRENCY_API_KEY,
        base_currency: from,
        currencies: to,
      },
    });
  } catch (error) {
    console.error('Error converting currencies:', error);
    throw error;
  }
};
