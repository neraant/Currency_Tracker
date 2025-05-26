import { ChangeEvent, useEffect, useRef } from 'react';
import { Modal } from '@components/common/Modal/Modal';
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
    handleOpenDropdown,
    handleSelect,
    handleChangeCurrencyCode,
    closeDropdown,
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
    if (!isModalOpen) {
      resetConversion();
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

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
      isOpen={isModalOpen}
      title="Convert currency"
      onClose={onCloseModal}
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
