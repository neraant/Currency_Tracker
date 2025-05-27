import { ChangeEvent, useEffect, useRef } from 'react';
import { Modal } from '@components/common/Modal/Modal';
import { useClickOutside } from '@hooks/useClickOutside';
import { useConversion } from '@hooks/useConversion';
import { useCurrencySelection } from '@hooks/useCurrencySelection';
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
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export const ConvertModal = ({
  currencies,
  clickedCurrency,
  isModalOpen,
  onCloseModal,
}: ConvertModelProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const {
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
  } = useCurrencySelection(currencies, clickedCurrency);

  const {
    amount,
    isAmountValid,
    isLoading,
    convertedAmount,
    handleChangeAmount,
    convertAmount,
    resetConversion,
  } = useConversion(clickedCurrency, selectedCurrency);

  useEffect(() => {
    if (!isModalOpen) {
      resetConversion();
      resetCurrency();
    }
  }, [isModalOpen]);

  useClickOutside(menuRef, closeDropdown);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeAmount(e.target.value);
  };

  const handleConvert = () => {
    convertAmount(selectedCurrency);
  };

  const inputDisplayValue = isDropped ? searchValue : displayText;
  const inputPlaceholder = hasSelection ? selectedCurrency : 'Select currency';

  return (
    <Modal
      isOpen={isModalOpen}
      title="Convert currency"
      onClose={onCloseModal}
      onSubmit={handleConvert}
      isLoading={isLoading}
      buttonText="Convert"
    >
      <ConverterWrapper>
        <ConverterColumn>
          <ConverterDropDownLabel>{clickedCurrency}</ConverterDropDownLabel>

          <ConverterDropDown ref={menuRef}>
            <ConverterDropDownInput
              type="text"
              value={inputDisplayValue}
              placeholder={inputPlaceholder}
              onChange={handleInputChange}
              onClick={handleOpenDropdown}
              autoComplete="off"
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
