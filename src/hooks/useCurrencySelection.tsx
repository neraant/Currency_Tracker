import { useEffect, useState } from 'react';
import { Currency, CurrencyCode } from '@typings/currency';
import { useDebounce } from './useDebounce';

export const useCurrencySelection = (
  currencies: Currency[],
  initialCurrency: CurrencyCode | null
) => {
  const [isDropped, setIsDropped] = useState(false);
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode | ''>('');
  const [searchValue, setSearchValue] = useState('');

  const { debouncedValue } = useDebounce(searchValue, 400);

  useEffect(() => {
    if (initialCurrency) {
      setSelectedCurrency(initialCurrency);
    }
  }, [initialCurrency]);

  useEffect(() => {
    const normalizedValue = debouncedValue.trim().toLowerCase();

    const filtered = currencies.filter(({ code, name }) => {
      if (!normalizedValue) return true;

      return (
        code.toLowerCase().includes(normalizedValue) ||
        name?.toLowerCase().includes(normalizedValue)
      );
    });

    setFilteredCurrencies(filtered);
  }, [debouncedValue, currencies]);

  const handleOpenDropdown = () => {
    setIsDropped((prev) => !prev);
  };

  const handleSelect = (currency: CurrencyCode) => {
    setSelectedCurrency(currency);
    setSearchValue('');
    setIsDropped(false);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const closeDropdown = () => {
    setIsDropped(false);
    setSearchValue('');
  };

  const resetCurrency = () => {
    if (initialCurrency) {
      setSelectedCurrency(initialCurrency);
    } else {
      setSelectedCurrency('');
    }
    setSearchValue('');
  };

  const displayText = selectedCurrency || 'Select currency';
  const hasSelection = Boolean(selectedCurrency);

  return {
    isDropped,
    filteredCurrencies,
    selectedCurrency,
    searchValue,
    displayText,
    hasSelection,
    handleOpenDropdown,
    handleSelect,
    handleSearch,
    closeDropdown,
    resetCurrency,
  };
};
