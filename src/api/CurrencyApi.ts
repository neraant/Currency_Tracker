import axios from 'axios';

import { formatCurrencyData } from '@utils/formatCurrencyData';

import { CURRENCIES } from '@constants/Currencies';

const API_KEY = process.env.REACT_CURRENCY_API_KEY;
const BASE_URL = process.env.REACT_CURRENCY_API_BASE_URL;

const BASE_CURRENCY = 'BRL';

export const fetchCurrencyData = async () => {
  if (!API_KEY || !BASE_URL) {
    throw new Error('Missing environment variables');
  }

  const currencies = CURRENCIES.join(',');

  try {
    const { data } = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&base_currency=${BASE_CURRENCY}&currencies=${currencies}`
    );

    return formatCurrencyData(data);
  } catch (error) {
    console.error('Error fetching currencies data:', error);
    throw error;
  }
};

export const convertCurrency = async (from: string | null, to: string) => {
  if (!API_KEY || !BASE_URL) {
    throw new Error('Missing environment variables');
  }

  try {
    const { data } = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&base_currency=${from}&currencies=${to}`
    );

    return data;
  } catch (error) {
    console.error('Error converting currencies:', error);
    throw error;
  }
};
