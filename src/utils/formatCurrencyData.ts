import { CURRENCY_NAMES, CURRENCY_ICONS } from '@constants/Currencies';

import { Currency, CurrencyApiResponse, FormattedCurrencyData } from '../types/currency';

export const formatCurrencyData = (data: CurrencyApiResponse): FormattedCurrencyData => {
  const formatted: Currency[] = [];

  for (const [code, details] of Object.entries(data.data)) {
    formatted.push({
      code,
      name: CURRENCY_NAMES[code] || code,
      icon: CURRENCY_ICONS[code],
      value: parseFloat(details.value.toFixed(2)),
      formattedValue: `R$ ${details.value.toFixed(2)}`,
    });
  }

  return {
    currencies: formatted,
    last_updated_at: data.meta?.last_updated_at,
  };
};
