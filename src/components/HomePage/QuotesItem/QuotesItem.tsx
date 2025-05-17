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
  code: string;
  selectCurrency: (currency: string) => void;
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
