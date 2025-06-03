import { CurrencyCode } from '@typings/currency';
import {
  QuotesCard,
  QuotesCardIcon,
  QuotesCardInfo,
  QuotesCardText,
  QuotesCardTitle,
} from './styled';

interface QuotesItemsProps {
  icon: string;
  name: string;
  formattedValue: string;
  code: CurrencyCode;
  selectCurrency: (currency: CurrencyCode) => void;
}

export const QuotesItem = ({
  icon,
  name,
  formattedValue,
  code,
  selectCurrency,
}: QuotesItemsProps) => {
  return (
    <QuotesCard data-testid={`currency-card-${code}`} onClick={() => selectCurrency(code)}>
      <QuotesCardIcon data-testid="currency-card-icon" src={icon} alt={name} />

      <QuotesCardInfo>
        <QuotesCardTitle data-testid="currency-card-title">{name}</QuotesCardTitle>

        <QuotesCardText data-testid="currency-card-text">{formattedValue}</QuotesCardText>
      </QuotesCardInfo>
    </QuotesCard>
  );
};
