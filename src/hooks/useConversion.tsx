import { useState } from 'react';

import { convertCurrency } from '@api/currencyApi';

import { CurrencyCode, MAX_PARSED_VALUE } from '@typings/currency';

export const useConversion = (fromCurrency: CurrencyCode | null) => {
  const [amount, setAmount] = useState('');
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState('0.00');

  const handleChangeAmount = (value: string) => {
    const parsed = parseFloat(value);

    if (parsed > MAX_PARSED_VALUE) return;

    setAmount(value);
    setIsAmountValid(!isNaN(parsed) && parsed >= 0);
  };

  const resetConversion = () => {
    setConvertedAmount('0.00');
    setAmount('');
    setIsAmountValid(true);
  };

  const convertAmount = async (toCurrency: string) => {
    const isInvalid = !fromCurrency || !toCurrency || !isAmountValid || !amount;

    if (isInvalid) {
      setConvertedAmount('0.00');
      return;
    }

    setIsLoading(true);

    try {
      const data = await convertCurrency(fromCurrency, toCurrency);
      const rate = data?.data?.[toCurrency]?.value;
      const parsedAmount = parseFloat(amount);

      if (rate !== undefined && rate !== null) {
        setConvertedAmount((parsedAmount * rate).toFixed(2));
      } else {
        setConvertedAmount('Error');
      }
    } catch (error) {
      console.error('Error while converting: ', error);
      setConvertedAmount('Error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    amount,
    isAmountValid,
    isLoading,
    convertedAmount,
    handleChangeAmount,
    convertAmount,
    resetConversion,
  };
};
