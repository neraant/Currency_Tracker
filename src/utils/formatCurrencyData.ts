import { CURRENCY_NAMES } from '@constants/Currencies';
import { CURRENCY_ICONS } from '@constants/Currencies';

import { Currency, CurrencyApiResponse } from '../types/asd';

export const formatCurrencyData = (data: CurrencyApiResponse) => {
  const formattedData: Currency[] = [];

  for (const [code, details] of Object.entries(data.data)) {
    formattedData.push({
      code: code,
      name: CURRENCY_NAMES[code] || code,
      icon: CURRENCY_ICONS[code],
      value: parseFloat(details.value.toFixed(2)),
      formattedValue: `R$ ${details.value.toFixed(2)}`,
    });
  }

  return formattedData;
};
