import { useEffect, useState } from 'react';
import { Currency, CurrencyCode } from '@typings/currency';
import { useDebounce } from './useDebounce';

export const useCurrencySelection = (
  currencies: Currency[],
  initialCurrency: CurrencyCode | null
) => {
  const [isDropped, setIsDropped] = useState(false);
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(CurrencyCode.USD);

  const { debouncedValue } = useDebounce(selectedCurrency, 400);

  useEffect(() => {
    const normalizedValue = debouncedValue.trim().toLowerCase();

    const filtered = currencies.filter(({ code }) =>
      normalizedValue ? code.toLowerCase().includes(normalizedValue) : true
    );

    setFilteredCurrencies(filtered);
  }, [debouncedValue, currencies]);

  useEffect(() => {
    if (!isDropped && !selectedCurrency.trim()) {
      setSelectedCurrency(CurrencyCode.USD);
    }
  }, [isDropped]);

  const handleOpenDropdown = () => {
    setIsDropped((prev) => !prev);
  };

  const handleSelect = (currency: CurrencyCode) => {
    setSelectedCurrency(currency);
    setIsDropped(false);
  };

  const handleChangeCurrencyCode = (value: string) => {
    setSelectedCurrency(value as CurrencyCode);
  };

  const closeDropdown = () => {
    setIsDropped(false);

    if (!selectedCurrency) {
      setSelectedCurrency(CurrencyCode.USD);
    }
  };

  const resetCurrency = () => {
    if (initialCurrency) {
      setSelectedCurrency(initialCurrency);
    }
  };

  return {
    isDropped,
    filteredCurrencies,
    selectedCurrency,
    handleOpenDropdown,
    handleSelect,
    handleChangeCurrencyCode,
    closeDropdown,
    resetCurrency,
  };
};
