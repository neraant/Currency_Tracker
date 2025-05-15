import { useEffect, useState } from 'react';

import { useQuery } from '@hooks/useQuery';

import { fetchCurrencyData } from '@api/CurrencyApi';

import { formatCurrencyData } from '@utils/formatCurrencyData';

import { QuotesListContainer, QuotesListTitle, QuotesListWrapper } from './styled';
import { Currency } from '../../../types/asd';
import { QuotesItem } from '../QuotesItem/QuotesItem';

export const QuotesList = () => {
  const { data, isLoading, error } = useQuery('currencies', fetchCurrencyData);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    if (!data) return;
    setCurrencies(formatCurrencyData(data));
  }, [data]);

  return (
    <QuotesListContainer>
      <QuotesListTitle>Quotes</QuotesListTitle>

      {isLoading ? (
        'loading'
      ) : (
        <QuotesListWrapper>
          {currencies.map(({ name, icon, formattedValue }) => (
            <QuotesItem key={name} name={name} icon={icon} info={formattedValue} />
          ))}
        </QuotesListWrapper>
      )}
    </QuotesListContainer>
  );
};
