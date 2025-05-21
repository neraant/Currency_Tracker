import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
  margin: ${({ theme }) => theme.spacing[20]} 0;

  @media (max-width: 620px) {
    margin: ${({ theme }) => theme.spacing[10]} 0;
  }
`;

export const SearchTitle = styled.h3`
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  color: ${({ theme }) => theme.neutral.white};
  text-align: center;

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }
`;

export const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 450px;

  @media (max-width: 620px) {
    max-width: 250px;
  }
`;

export const SearchInput = styled.input`
  padding: ${({ theme }) => theme.spacing[5]};
  padding-right: ${({ theme }) => theme.spacing[12]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  font-size: ${({ theme }) => theme.typography.fontSize['lg']};
  color: ${({ theme }) => theme.neutral.white};
  border-radius: ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.background.tertiary};
  width: 100%;
  &::placeholder {
    color: #9e9e9e;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  z-index: 110;
  top: 50%;
  right: ${({ theme }) => theme.spacing[5]};
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.background.tertiary};
`;
