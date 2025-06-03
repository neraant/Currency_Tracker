import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent, ReactNode } from 'react';
import { CURRENCIES } from '@constants/currencies';
import { useClickOutside } from '@hooks/useClickOutside';
import { CurrencyCode } from '@typings/currency';
import { CurrencyDropDownItem, CurrencyDropDownList, CurrencyDropDownWrapper } from './styled';

interface ICurrencyDropDownProps {
  selectedCurrency?: CurrencyCode | '';
  canBeEmpty?: boolean;
  setCurrency: (newCurrency: CurrencyCode | '') => void;
  onClose?: () => void;
  children: (props: {
    query: string;
    handleDropDown: () => void;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  }) => ReactNode;
}

export const CurrencyDropDown = ({
  selectedCurrency = '',
  canBeEmpty,
  setCurrency,
  onClose,
  children,
}: ICurrencyDropDownProps) => {
  const [query, setQuery] = useState<string>('');
  const [isDropped, setIsDropped] = useState<boolean>(false);
  const [filteredCurrencies, setFilteredCurrencies] = useState<CurrencyCode[]>(CURRENCIES);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useClickOutside<HTMLDivElement | null>(inputRef, () => {
    const trimmedQuery = query.trim();

    if (!canBeEmpty && trimmedQuery !== selectedCurrency) {
      setQuery(selectedCurrency);
      setFilteredCurrencies(CURRENCIES);
    }

    if (canBeEmpty && trimmedQuery === '') {
      setCurrency('');
    }

    setIsDropped(false);
    setActiveIndex(-1);
    onClose?.();
  });

  useEffect(() => {
    if (selectedCurrency !== query) {
      setQuery(selectedCurrency);
    }
  }, [selectedCurrency]);

  const handleDropDown = () => {
    const willBeDropped = !isDropped;
    setIsDropped(willBeDropped);
    setActiveIndex(-1);
    setQuery('');
    if (!willBeDropped) onClose?.();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      const filtered =
        input.trim() === ''
          ? CURRENCIES
          : CURRENCIES.filter((cur) => cur.toLowerCase().includes(input.toLowerCase()));

      setFilteredCurrencies(filtered);
      setIsDropped(true);
      setActiveIndex(-1);
    }, 300);
  };

  const handleSelect = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    setQuery(newCurrency);
    setIsDropped(false);
    setFilteredCurrencies(CURRENCIES);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isDropped) return;

    const key = e.key;
    const maxIndex = filteredCurrencies.length - 1;
    const nextIndex = activeIndex + 1;
    const prevIndex = activeIndex - 1;

    switch (key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => (prev < maxIndex ? nextIndex : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prevIndex : maxIndex));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex <= maxIndex) {
          handleSelect(filteredCurrencies[activeIndex]);
        }
        break;
      case 'Escape':
        setIsDropped(false);
        setActiveIndex(-1);
        break;
      default:
        break;
    }
  };

  return (
    <CurrencyDropDownWrapper data-testid="currency-selector-wrapper" ref={inputRef}>
      {children({
        query,
        handleDropDown,
        handleInputChange,
        handleKeyDown,
      })}

      <CurrencyDropDownList data-testid="currency-selector" $isDropped={isDropped}>
        {filteredCurrencies.length ? (
          filteredCurrencies.map((currency, index) => (
            <CurrencyDropDownItem
              key={currency}
              onClick={() => handleSelect(currency)}
              $isActive={index === activeIndex}
              data-testid={`currency-selector-${currency}`}
            >
              {currency}
            </CurrencyDropDownItem>
          ))
        ) : (
          <CurrencyDropDownItem
            data-testid="no-results-message"
            style={{ pointerEvents: 'none', opacity: 0.6 }}
          >
            Not found
          </CurrencyDropDownItem>
        )}
      </CurrencyDropDownList>
    </CurrencyDropDownWrapper>
  );
};
