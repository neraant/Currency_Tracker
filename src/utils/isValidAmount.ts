import { MAX_PARSED_VALUE } from '@constants/currencies';

export const isValidAmount = (value: string): boolean => {
  return value === '' || (/^\d*(\.\d{0,3})?$/.test(value) && parseFloat(value) < MAX_PARSED_VALUE);
};
