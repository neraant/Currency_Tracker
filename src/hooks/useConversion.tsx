import { useEffect, useState } from 'react';
import { convertCurrency } from '@api/currencyApi';
import { INITIAL_CURRENCY } from '@constants/currencies';
import { CurrencyCode } from '@typings/currency';
import { isValidAmount } from '@utils/isValidAmount';

export const useConversion = (
  fromCurrency: CurrencyCode | null,
  selectedCurrency: CurrencyCode | ''
) => {
  const [amount, setAmount] = useState('');
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState(INITIAL_CURRENCY);

  useEffect(() => {
    if (selectedCurrency) {
      resetConversion();
    }
  }, [selectedCurrency]);

  const handleChangeAmount = (value: string) => {
    const parsed = parseFloat(value);

    const isValueValid = isValidAmount(value);

    if (isValueValid) {
      setAmount(value);
      setIsAmountValid(!isNaN(parsed) && parsed >= 0);
    }
  };

  const resetConversion = () => {
    setConvertedAmount(INITIAL_CURRENCY);
    setAmount('');
    setIsAmountValid(true);
  };

  const convertAmount = async (toCurrency: string) => {
    const isInvalid = !fromCurrency || !toCurrency || !isAmountValid || !amount;

    if (isInvalid) {
      setConvertedAmount(INITIAL_CURRENCY);
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
