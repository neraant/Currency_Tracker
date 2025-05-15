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
  info: string;
}

export const QuotesItem = ({ icon, name, info }: QuotesItemsProps) => {
  return (
    <QuotesCard>
      <QuotesCardIcon src={icon} alt={name} />

      <QuotesCardInfo>
        <QuotesCardTitle>{name}</QuotesCardTitle>

        <QuotesCardText>{info}</QuotesCardText>
      </QuotesCardInfo>
    </QuotesCard>
  );
};
