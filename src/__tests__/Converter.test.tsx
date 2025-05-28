import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ConvertModal } from '@components/HomePage/ConvertModal/ConvertModal';
import * as conversionHook from '@hooks/useConversion';
import * as currencyHook from '@hooks/useCurrencySelection';
import { DarkTheme as theme } from '@styles/Theme';
import { Currency, CurrencyCode } from '@typings/currency';

const defaultConversionMock = {
  amount: '100',
  isAmountValid: true,
  isLoading: false,
  convertedAmount: '110',
  handleChangeAmount: jest.fn(),
  convertAmount: jest.fn(),
  resetConversion: jest.fn(),
};

const defaultSelectionMock = {
  isDropped: false,
  filteredCurrencies: [{ code: 'USD' }, { code: 'EUR' }, { code: 'JPY' }],
  selectedCurrency: CurrencyCode.USD,
  handleOpenDropdown: jest.fn(),
  handleSelect: jest.fn(),
  handleChangeCurrencyCode: jest.fn(),
  closeDropdown: jest.fn(),
  resetCurrency: jest.fn(),
};

jest.mock('@hooks/useConversion.tsx');
jest.mock('@hooks/useCurrencySelection.tsx');
jest.mock('@assets/icons/arrow_icon.svg', () => 'mocked-arrow-icon.svg');

jest.mock('@components/common/Modal/Modal.tsx', () => ({
  Modal: ({ children, onSubmit, isOpen, isLoading }: any) =>
    isOpen && (
      <div>
        <button disabled={isLoading} data-testid="convert-button" onClick={onSubmit}>
          Convert
        </button>
        {children}
      </div>
    ),
}));

describe('ConvertModal', () => {
  const onCloseModal = jest.fn();

  const setup = ({
    conversionMock = defaultConversionMock,
    selectionMock = defaultSelectionMock,
  } = {}) => {
    (conversionHook.useConversion as jest.Mock).mockReturnValue(conversionMock);
    (currencyHook.useCurrencySelection as jest.Mock).mockReturnValue(selectionMock);

    const currencies: Currency[] = [
      {
        code: CurrencyCode.USD,
        name: 'US Dollar',
        icon: '',
        value: 1.2,
        formattedValue: '1.2',
      },
    ];

    return render(
      <ThemeProvider theme={theme}>
        <ConvertModal
          currencies={currencies}
          clickedCurrency={CurrencyCode.EUR}
          isModalOpen={true}
          onCloseModal={onCloseModal}
        />
      </ThemeProvider>
    );
  };

  it('Converter: renders modal', () => {
    const { getByTestId } = setup();
    expect(getByTestId('convert-button')).toBeInTheDocument();
  });

  it('Converter: shows default values', () => {
    const { getByTestId } = setup();
    expect(getByTestId('amount-input')).toHaveValue('100');
    expect(getByTestId('currency-input')).toHaveValue('USD');
  });

  it('Converter: calls handleChangeAmount while user typing', () => {
    const mockChangeAmount = jest.fn();

    const conversionMock = {
      ...defaultConversionMock,
      handleChangeAmount: mockChangeAmount,
    };

    const { getByTestId } = setup({ conversionMock });

    const amountInput = getByTestId('amount-input');
    fireEvent.change(amountInput, { target: { value: '200' } });

    expect(mockChangeAmount).toHaveBeenCalledWith('200');
  });

  it('Converter: check invalid input data', () => {
    const mockChangeAmount = jest.fn();
    const mockConvertAmount = jest.fn();

    const conversionMock = {
      ...defaultConversionMock,
      isAmountValid: false,
      convertedAmount: '',
      handleChangeAmount: mockChangeAmount,
      convertAmount: mockConvertAmount,
    };

    const { getByTestId } = setup({ conversionMock });

    const amountInput = getByTestId('amount-input');
    fireEvent.change(amountInput, { target: { value: 'abc' } });

    const convertButton = getByTestId('convert-button');
    fireEvent.click(convertButton);

    expect(mockChangeAmount).toHaveBeenCalledWith('abc');
    expect(mockConvertAmount).toHaveBeenCalled();

    const output = getByTestId('converted-output') as HTMLInputElement;
    expect(output.value).toBe('');
  });

  it('Converter: open dropdown list', () => {
    const selectionMock = {
      ...defaultSelectionMock,
      isDropped: true,
    };

    const { getByTestId } = setup({ selectionMock });

    const currencyInput = getByTestId('currency-input');
    fireEvent.click(currencyInput);

    const dropdownList = getByTestId('dropdown-list');
    expect(dropdownList).toBeInTheDocument();

    expect(getByTestId('dropdown-item-USD')).toBeInTheDocument();
    expect(getByTestId('dropdown-item-EUR')).toBeInTheDocument();
  });

  it('Converter: select dropdown item', () => {
    const mockHandleSelect = jest.fn();

    const selectionMock = {
      ...defaultSelectionMock,
      handleSelect: mockHandleSelect,
      isDropped: true,
    };

    const { getByTestId } = setup({ selectionMock });

    const currency = getByTestId('dropdown-item-JPY');
    fireEvent.click(currency);

    expect(mockHandleSelect).toHaveBeenCalledWith('JPY');
  });

  it('Conveter: calls convertAmount when valid input submitted', () => {
    const mockConvertAmount = jest.fn();

    const conversionMock = {
      ...defaultConversionMock,
      isAmountValid: true,
      convertAmount: mockConvertAmount,
    };

    const { getByTestId } = setup({ conversionMock });

    const convertButton = getByTestId('convert-button');
    fireEvent.click(convertButton);

    expect(mockConvertAmount).toHaveBeenCalled();
  });

  it('Converter: renders converted amount', () => {
    const conversionMock = {
      ...defaultConversionMock,
      convertedAmount: '150',
    };

    const { getByTestId } = setup({ conversionMock });

    const output = getByTestId('converted-output') as HTMLInputElement;
    expect(output.value).toBe('150');
  });

  it('Converter: shows loading state when converting', () => {
    const conversionMock = {
      ...defaultConversionMock,
      isLoading: true,
    };

    const { getByTestId } = setup({ conversionMock });
    const convertButton = getByTestId('convert-button');

    expect(convertButton).toHaveAttribute('disabled');
  });

  it('Converter: closes dropdown after currency selection', () => {
    const mockHandleSelect = jest.fn();
    const mockCloseDropdown = jest.fn();

    const selectionMock = {
      ...defaultSelectionMock,
      isDropped: true,
      handleSelect: mockHandleSelect,
      closeDropdown: mockCloseDropdown,
    };

    const { getByTestId } = setup({ selectionMock });

    const currency = getByTestId('dropdown-item-EUR');
    fireEvent.click(currency);

    expect(mockHandleSelect).toHaveBeenCalledWith('EUR');
  });
});
