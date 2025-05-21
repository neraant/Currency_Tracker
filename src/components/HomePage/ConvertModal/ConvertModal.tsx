import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { Modal } from '@components/common/Modal/Modal';

import { useConversion } from '@hooks/useConversion';
import { useCurrencySelection } from '@hooks/useCurrencySelection';
import { useDebounce } from '@hooks/useDebounce';

import { convertCurrency } from '@api/currencyApi';

import { Currency, CurrencyCode } from '@typings/currency';

import {
  ConverterColumn,
  ConverterDropDown,
  ConverterDropDownInput,
  ConverterDropDownItem,
  ConverterDropDownLabel,
  ConverterDropDownList,
  ConverterInput,
  ConverterOutput,
  ConverterWrapper,
} from './styled';

interface ConvertModelProps {
  currencies: Currency[];
  clickedCurrency: CurrencyCode | null;
  isModal: boolean;
  handleCloseModal: () => void;
}

const MAX_PARSED_VALUE = 1_000_000;

export const ConvertModal = ({
  currencies,
  clickedCurrency,
  isModal,
  handleCloseModal,
}: ConvertModelProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const {
    isDropped,
    filteredCurrencies,
    selectedCurrency,
    handleOpenDropdown,
    handleSelect,
    handleChangeCurrencyCode,
    closeDropdown,
    resetCurrency,
  } = useCurrencySelection(currencies, clickedCurrency);

  const {
    amount,
    isAmountValid,
    isLoading,
    convertedAmount,
    handleChangeAmount,
    convertAmount,
    resetConversion,
  } = useConversion(clickedCurrency);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isDropped && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeDropdown();

        if (selectedCurrency.trim() === '' && currencies.length > 0 && clickedCurrency) {
          resetCurrency();
        }
      }
    };

    if (!isModal) {
      resetConversion();
    }

    if (isDropped || isModal) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = '';
    };
  }, [isDropped, isModal, selectedCurrency, currencies, handleCloseModal]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeCurrencyCode(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeAmount(e.target.value);
  };

  const handleConvert = () => {
    convertAmount(selectedCurrency);
  };

  return (
    <Modal
      isOpen={isModal}
      onClose={handleCloseModal}
      onSubmit={handleConvert}
      isLoading={isLoading}
    >
      <ConverterWrapper>
        <ConverterColumn>
          <ConverterDropDownLabel>{clickedCurrency}</ConverterDropDownLabel>

          <ConverterDropDown ref={menuRef}>
            <ConverterDropDownInput
              type="text"
              value={selectedCurrency}
              onChange={handleInputChange}
              onClick={handleOpenDropdown}
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
            onChange={handleAmountChange}
            $isValid={isAmountValid}
          />

          <ConverterOutput disabled value={convertedAmount} />
        </ConverterColumn>
      </ConverterWrapper>
    </Modal>
  );
};
