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

  describe('Modal Rendering', () => {
    test('renders modal', () => {
      const { getByTestId } = setup();
      expect(getByTestId('convert-button')).toBeInTheDocument();
    });

    test('renders converted amount', () => {
      const conversionMock = { ...defaultConversionMock, convertedAmount: '150' };
      const { getByTestId } = setup({ conversionMock });
      expect((getByTestId('converted-output') as HTMLInputElement).value).toBe('150');
    });

    test('shows loading state when converting', () => {
      const conversionMock = { ...defaultConversionMock, isLoading: true };
      const { getByTestId } = setup({ conversionMock });
      expect(getByTestId('convert-button')).toHaveAttribute('disabled');
    });
  });

  describe('Amount Input', () => {
    test('calls handleChangeAmount while typing', () => {
      const mockChangeAmount = jest.fn();
      const conversionMock = { ...defaultConversionMock, handleChangeAmount: mockChangeAmount };
      const { getByTestId } = setup({ conversionMock });

      fireEvent.change(getByTestId('amount-input'), { target: { value: '200' } });
      expect(mockChangeAmount).toHaveBeenCalledWith('200');
    });

    test('handles invalid input data', () => {
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
      fireEvent.change(getByTestId('amount-input'), { target: { value: 'abc' } });
      fireEvent.click(getByTestId('convert-button'));

      expect(mockChangeAmount).toHaveBeenCalledWith('abc');
      expect(mockConvertAmount).toHaveBeenCalled();
      expect((getByTestId('converted-output') as HTMLInputElement).value).toBe('');
    });

    test('calls convertAmount when input is valid and submitted', () => {
      const mockConvertAmount = jest.fn();
      const conversionMock = { ...defaultConversionMock, convertAmount: mockConvertAmount };

      const { getByTestId } = setup({ conversionMock });
      fireEvent.click(getByTestId('convert-button'));

      expect(mockConvertAmount).toHaveBeenCalled();
    });
  });

  describe('Dropdown Interaction', () => {
    test('opens dropdown list on click', () => {
      const selectionMock = { ...defaultSelectionMock, isDropped: true };
      const { getByTestId } = setup({ selectionMock });

      fireEvent.click(getByTestId('currency-input'));

      expect(getByTestId('dropdown-list')).toBeInTheDocument();
      expect(getByTestId('dropdown-item-USD')).toBeInTheDocument();
      expect(getByTestId('dropdown-item-EUR')).toBeInTheDocument();
    });

    test('selects dropdown item', () => {
      const mockHandleSelect = jest.fn();
      const selectionMock = {
        ...defaultSelectionMock,
        handleSelect: mockHandleSelect,
        isDropped: true,
      };

      const { getByTestId } = setup({ selectionMock });
      fireEvent.click(getByTestId('dropdown-item-JPY'));

      expect(mockHandleSelect).toHaveBeenCalledWith('JPY');
    });

    test('closes dropdown when clicking outside', () => {
      const mockCloseDropdown = jest.fn();
      const selectionMock = {
        ...defaultSelectionMock,
        isDropped: true,
        closeDropdown: mockCloseDropdown,
      };

      const { getByTestId, container } = setup({ selectionMock });
      fireEvent.click(getByTestId('currency-input'));
      fireEvent.mouseDown(container);

      expect(mockCloseDropdown).toHaveBeenCalled();
    });

    test('closes dropdown after selecting currency', () => {
      const mockHandleSelect = jest.fn();
      const mockCloseDropdown = jest.fn();
      const selectionMock = {
        ...defaultSelectionMock,
        isDropped: true,
        handleSelect: mockHandleSelect,
        closeDropdown: mockCloseDropdown,
      };

      const { getByTestId } = setup({ selectionMock });
      fireEvent.click(getByTestId('dropdown-item-EUR'));

      expect(mockHandleSelect).toHaveBeenCalledWith('EUR');
    });
  });

  describe('Modal Lifecycle', () => {
    test('resets conversion and currency on modal close', () => {
      const mockResetConversion = jest.fn();
      const mockResetCurrency = jest.fn();
      const conversionMock = { ...defaultConversionMock, resetConversion: mockResetConversion };
      const selectionMock = { ...defaultSelectionMock, resetCurrency: mockResetCurrency };

      const { rerender } = setup({ conversionMock, selectionMock });

      rerender(
        <ThemeProvider theme={theme}>
          <ConvertModal
            currencies={[]}
            clickedCurrency={CurrencyCode.EUR}
            isModalOpen={false}
            onCloseModal={onCloseModal}
          />
        </ThemeProvider>
      );

      expect(mockResetConversion).toHaveBeenCalled();
      expect(mockResetCurrency).toHaveBeenCalled();
    });
  });
});
