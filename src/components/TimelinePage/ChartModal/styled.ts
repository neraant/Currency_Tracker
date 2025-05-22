import styled from 'styled-components';

export const ChartInputsContainer = styled.div`
  max-height: calc(70dvh - 200px);
  overflow-y: auto;
  padding-right: ${({ theme }) => theme.spacing[3]};
  scrollbar-width: thin;
`;
