import { CURRENCY_ICONS, CURRENCY_NAMES } from '@constants/currencies';
import {
  Currency,
  CurrencyApiResponse,
  CurrencyCode,
  FormattedCurrencyData,
} from '@typings/currency';

export const formatCurrencyData = (data: CurrencyApiResponse): FormattedCurrencyData => {
  const formatted: Currency[] = [];

  for (const [code, details] of Object.entries(data.data)) {
    const currencyCode = code as CurrencyCode;

    formatted.push({
      code: currencyCode,
      name: CURRENCY_NAMES[code as CurrencyCode] || code,
      icon: CURRENCY_ICONS[code as CurrencyCode],
      value: parseFloat(details.value.toFixed(2)),
      formattedValue: `R$ ${details.value.toFixed(2)}`,
    });
  }

  return {
    currencies: formatted,
    last_updated_at: data.meta?.last_updated_at,
  };
};
