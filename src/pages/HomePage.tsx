import { useEffect, useState } from 'react';

import { fetchCurrencyData } from '@api/currencyApi';
import { ConvertModal } from '@components/HomePage/ConvertModal/ConvertModal';
import { QuotesList } from '@components/HomePage/QuotesList/QuotesList';
import { CacheKeys } from '@constants/cacheKeys';
import { useSubject } from '@context/ObserverConext';
import { useQuery } from '@hooks/useQuery';
import { Container } from '@styles/GlobalStyle';
import { Currency, CurrencyCode } from '@typings/currency';

export const HomePage = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [clickedCurrency, setClickedCurrency] = useState<CurrencyCode | null>(null);
  const [isModal, setIsModal] = useState(false);

  const { data, isLoading, error } = useQuery(CacheKeys.CURRENCIES, fetchCurrencyData);
  const subject = useSubject('last_updated');

  useEffect(() => {
    if (!data) return;
    const { currencies, last_updated_at } = data;

    subject.setState(last_updated_at ?? null);
    setCurrencies(currencies);
  }, [data]);

  const selectCurrency = (currency: CurrencyCode) => {
    setClickedCurrency(currency);
    setIsModal(true);
  };

  const handleCloseModal = () => {
    setIsModal(false);
  };

  return (
    <Container>
      <QuotesList
        currencies={currencies}
        isLoading={isLoading}
        error={error}
        selectCurrency={selectCurrency}
      />
      <ConvertModal
        currencies={currencies}
        clickedCurrency={clickedCurrency}
        handleCloseModal={handleCloseModal}
        isModal={isModal}
      />
    </Container>
  );
};
