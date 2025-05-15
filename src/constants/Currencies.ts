import ArsIcon from '@assets/icons/ARS_Icon.svg';
import AudIcon from '@assets/icons/AUD_Icon.svg';
import BtcIcon from '@assets/icons/BTC_Icon.svg';
import CadIcon from '@assets/icons/CAD_Icon.svg';
import CnyIcon from '@assets/icons/CNY_Icon.svg';
import EurIcon from '@assets/icons/EUR_Icon.svg';
import GbpIcon from '@assets/icons/GBP_Icon.svg';
import JpyIcon from '@assets/icons/JPY_Icon.svg';
import UsdIcon from '@assets/icons/USD_Icon.svg';

export const CURRENCIES = ['USD', 'ARS', 'CAD', 'JPY', 'AUD', 'CNY', 'EUR', 'BTC', 'GBP'];

export const CURRENCY_ICONS: Record<string, string> = {
  USD: UsdIcon,
  ARS: ArsIcon,
  CAD: CadIcon,
  JPY: JpyIcon,
  AUD: AudIcon,
  CNY: CnyIcon,
  EUR: EurIcon,
  BTC: BtcIcon,
  GBP: GbpIcon,
};

export const CURRENCY_NAMES: Record<string, string> = {
  USD: 'Commercial Dollar',
  ARS: 'Argentine Peso',
  CAD: 'Canadian Dollar',
  JPY: 'Yen',
  AUD: 'Australian Dollar',
  CNY: 'Yuan',
  EUR: 'Euro',
  BTC: 'Bitcoin',
  GBP: 'Libra',
};
