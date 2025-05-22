import ArsIcon from '@assets/icons/ARS_Icon.svg';
import AudIcon from '@assets/icons/AUD_Icon.svg';
import BtcIcon from '@assets/icons/BTC_Icon.svg';
import CadIcon from '@assets/icons/CAD_Icon.svg';
import CnyIcon from '@assets/icons/CNY_Icon.svg';
import EurIcon from '@assets/icons/EUR_Icon.svg';
import GbpIcon from '@assets/icons/GBP_Icon.svg';
import JpyIcon from '@assets/icons/JPY_Icon.svg';
import UsdIcon from '@assets/icons/USD_Icon.svg';
import { CurrencyCode } from '@typings/currency';

export const CURRENCIES: CurrencyCode[] = [
  CurrencyCode.USD,
  CurrencyCode.ARS,
  CurrencyCode.CAD,
  CurrencyCode.JPY,
  CurrencyCode.AUD,
  CurrencyCode.CNY,
  CurrencyCode.EUR,
  CurrencyCode.BTC,
  CurrencyCode.GBP,
];

export const CURRENCY_ICONS: Record<CurrencyCode, string> = {
  [CurrencyCode.USD]: UsdIcon,
  [CurrencyCode.ARS]: ArsIcon,
  [CurrencyCode.CAD]: CadIcon,
  [CurrencyCode.JPY]: JpyIcon,
  [CurrencyCode.AUD]: AudIcon,
  [CurrencyCode.CNY]: CnyIcon,
  [CurrencyCode.EUR]: EurIcon,
  [CurrencyCode.BTC]: BtcIcon,
  [CurrencyCode.GBP]: GbpIcon,
};

export const CURRENCY_NAMES: Record<CurrencyCode, string> = {
  [CurrencyCode.USD]: 'Commercial Dollar',
  [CurrencyCode.ARS]: 'Argentine Peso',
  [CurrencyCode.CAD]: 'Canadian Dollar',
  [CurrencyCode.JPY]: 'Yen',
  [CurrencyCode.AUD]: 'Australian Dollar',
  [CurrencyCode.CNY]: 'Yuan',
  [CurrencyCode.EUR]: 'Euro',
  [CurrencyCode.BTC]: 'Bitcoin',
  [CurrencyCode.GBP]: 'Libra',
};

export const BASE_CURRENCY = 'BRL';

export const MAX_PARSED_VALUE = 1_000_000;

export const INITIAL_CURRENCY = '0.00';
