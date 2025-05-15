import { useEffect, useState } from 'react';

import { useQuery } from '@hooks/useQuery';

import { fetchCurrencyData } from '@api/CurrencyApi';

import { useSubject } from '@context/ObserverConext';

import { formatCurrencyData } from '@utils/formatCurrencyData';

import { QuotesListContainer, QuotesListTitle, QuotesListWrapper } from './styled';
import { Currency } from '../../../types/currency';
import { QuotesItem } from '../QuotesItem/QuotesItem';

export const QuotesList = () => {
  const subject = useSubject('last_updated');

  const { data, isLoading, error } = useQuery('currencies', fetchCurrencyData);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    if (!data) return;
    const { currencies, last_updated_at } = formatCurrencyData(data);
    subject.setState(last_updated_at ?? '—');
    setCurrencies(currencies);
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
