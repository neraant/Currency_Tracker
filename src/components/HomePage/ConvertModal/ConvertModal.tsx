import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useDebounce } from '@hooks/useDebounce';

import { convertCurrency } from '@api/CurrencyApi';

import {
  ConverterButton,
  ConverterCloseButton,
  ConverterColumn,
  ConverterContainer,
  ConverterDropDown,
  ConverterDropDownInput,
  ConverterDropDownItem,
  ConverterDropDownLabel,
  ConverterDropDownList,
  ConverterInput,
  ConverterOutput,
  ConverterTitle,
  ConverterWrapper,
} from './styled';
import { Currency } from '../../../types/currency';

interface ConvertModelProps {
  currencies: Currency[];
  clickedCurrency: string | null;
  isModal: boolean;
  handleCloseModal: () => void;
}

export const ConvertModal = ({
  currencies,
  clickedCurrency,
  isModal,
  handleCloseModal,
}: ConvertModelProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [isDropped, setIsDropped] = useState(false);
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState('0.00');

  const { debouncedValue } = useDebounce(selectedCurrency, 400);

  const handleOpenClick = () => {
    setIsDropped((prev) => !prev);
  };

  const handleSelect = (currency: string) => {
    setSelectedCurrency(currency);
    setIsDropped(false);
  };

  const handleChangeCurrencyCode = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedCurrency(e.target.value);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsed = parseFloat(value);

    if (parsed > 1000000) return;

    setAmount(value);
    setIsAmountValid(!isNaN(parsed) && parsed >= 0);
  };

  const handleConvert = async () => {
    if (!clickedCurrency || !selectedCurrency || !isAmountValid || !amount) {
      setConvertedAmount('0.00');
      setAmount('');
      setIsAmountValid(false);
      return;
    }

    setIsLoading(true);

    try {
      const data = await convertCurrency(clickedCurrency, selectedCurrency);
      const rate = data?.data?.[selectedCurrency]?.value;
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

  useEffect(() => {
    const normalizedValue = debouncedValue.trim().toLowerCase();

    const filtered = currencies.filter(({ code }) =>
      normalizedValue ? code.toLowerCase().includes(normalizedValue) : true
    );

    setFilteredCurrencies(filtered);
  }, [debouncedValue, currencies, clickedCurrency]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isDropped && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsDropped(false);

        if (selectedCurrency.trim() === '' && currencies.length > 0 && clickedCurrency) {
          setSelectedCurrency(clickedCurrency);
        }
      }

      if (isModal && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleCloseModal();
        setAmount('');
        setIsAmountValid(true);
      }
    };

    if (isDropped || isModal) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    document.body.style.overflow = isModal ? 'hidden' : '';

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = '';
    };
  }, [isDropped, isModal, selectedCurrency, currencies, handleCloseModal]);

  return (
    <ConverterContainer ref={modalRef} $isModal={isModal}>
      <ConverterTitle>Convert Currency</ConverterTitle>

      <ConverterCloseButton onClick={handleCloseModal}>&#10005;</ConverterCloseButton>

      <ConverterWrapper>
        <ConverterColumn>
          <ConverterDropDownLabel>{clickedCurrency}</ConverterDropDownLabel>

          <ConverterDropDown ref={menuRef}>
            <ConverterDropDownInput
              type="text"
              value={selectedCurrency}
              onChange={handleChangeCurrencyCode}
              onClick={handleOpenClick}
            />

            <ConverterDropDownList $isDropped={isDropped}>
              {filteredCurrencies.map(({ code }) => (
                <ConverterDropDownItem key={code} onClick={() => handleSelect(code)}>
                  {code}
                </ConverterDropDownItem>
              ))}
            </ConverterDropDownList>
          </ConverterDropDown>
        </ConverterColumn>

        <ConverterColumn>
          <ConverterInput
            placeholder="0.00"
            value={amount}
            onChange={handleChangeAmount}
            $isValid={isAmountValid}
          />

          <ConverterOutput disabled value={convertedAmount} />
        </ConverterColumn>
      </ConverterWrapper>

      <ConverterButton onClick={handleConvert}>
        {isLoading ? 'Loading...' : 'Convert'}
      </ConverterButton>
    </ConverterContainer>
  );
};
