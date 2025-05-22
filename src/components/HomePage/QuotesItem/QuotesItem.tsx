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
    <QuotesCard onClick={() => selectCurrency(code)}>
      <QuotesCardIcon src={icon} alt={name} />

      <QuotesCardInfo>
        <QuotesCardTitle>{name}</QuotesCardTitle>

        <QuotesCardText>{formattedValue}</QuotesCardText>
      </QuotesCardInfo>
    </QuotesCard>
  );
};
