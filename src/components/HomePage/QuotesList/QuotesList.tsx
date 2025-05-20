import { ErrorFallback } from '@components/common/ErrorFallback/ErrorFallback';
import { Spinner } from '@components/common/Spinner/Spinner';

import { Currency, CurrencyCode } from '@typings/currency';

import { QuotesListContainer, QuotesListTitle, QuotesListWrapper } from './styled';
import { QuotesItem } from '../QuotesItem/QuotesItem';

interface QuotesListProps {
  isLoading: boolean;
  currencies: Currency[];
  error: Error | null;
  selectCurrency: (currency: CurrencyCode) => void;
}

export const QuotesList = ({ isLoading, currencies, error, selectCurrency }: QuotesListProps) => {
  if (error) {
    return (
      <QuotesListContainer>
        <QuotesListTitle>Quotes</QuotesListTitle>

        <ErrorFallback errorMessage={`Error loading currencies: ${error.message}`} />
      </QuotesListContainer>
    );
  }

  return (
    <QuotesListContainer>
      <QuotesListTitle>Quotes</QuotesListTitle>

      {isLoading ? (
        <Spinner />
      ) : (
        <QuotesListWrapper>
          {currencies.map((currency) => (
            <QuotesItem {...currency} key={currency.code} selectCurrency={selectCurrency} />
          ))}
        </QuotesListWrapper>
      )}
    </QuotesListContainer>
  );
};
