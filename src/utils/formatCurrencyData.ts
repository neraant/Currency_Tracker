import {
  Currency,
  CurrencyApiResponse,
  FormattedCurrencyData,
  CurrencyCode,
} from '@typings/currency';

import { CURRENCY_NAMES, CURRENCY_ICONS } from '@constants/Currencies';

export const formatCurrencyData = (data: CurrencyApiResponse): FormattedCurrencyData => {
  const formatted: Currency[] = [];

  for (const [code, details] of Object.entries(data.data)) {
    const currencyCode = code as CurrencyCode;

    formatted.push({
      code: currencyCode,
      name: CURRENCY_NAMES[currencyCode] || code,
      icon: CURRENCY_ICONS[currencyCode],
      value: parseFloat(details.value.toFixed(2)),
      formattedValue: `R$ ${details.value.toFixed(2)}`,
    });
  }

  return {
    currencies: formatted,
    last_updated_at: data.meta?.last_updated_at,
  };
};
