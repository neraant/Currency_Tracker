import { useEffect, useState } from 'react';

import { Container } from '@styles/GlobalStyle';

import { Overlay } from '@components/common/Overlay/Overlay';
import { ConvertModal } from '@components/HomePage/ConvertModal/ConvertModal';
import { QuotesList } from '@components/HomePage/QuotesList/QuotesList';

import { useQuery } from '@hooks/useQuery';

import { fetchCurrencyData } from '@api/CurrencyApi';

import { useSubject } from '@context/ObserverConext';

import { Currency } from '../types/currency';

export const HomePage = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [clickedCurrency, setClickedCurrency] = useState<string | null>(null);
  const [isModal, setIsModal] = useState(false);

  const { data, isLoading, error } = useQuery('currencies', fetchCurrencyData);
  const subject = useSubject('last_updated');

  useEffect(() => {
    if (!data) return;
    const { currencies, last_updated_at } = data;

    subject.setState(last_updated_at ?? null);
    setCurrencies(currencies);
  }, [data]);

  const selectCurrency = (currency: string) => {
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

      <Overlay isOpen={isModal} />
    </Container>
  );
};
