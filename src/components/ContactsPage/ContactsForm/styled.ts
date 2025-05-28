import styled from 'styled-components';

export const FormWrapper = styled.form`
  position: relative;
  padding: ${({ theme }) => theme.spacing[14]} ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.spacing[1]};
  background: ${({ theme }) => theme.neutral.preblack};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
  max-width: 500px;
  flex: 1;

  &::after {
    content: '';
    width: 100px;
    height: 100px;
    position: absolute;
    top: -${({ theme }) => theme.spacing[10]};
    left: -${({ theme }) => theme.spacing[10]};
    border-top: 4px solid ${({ theme }) => theme.neutral.green400};
    border-left: 4px solid ${({ theme }) => theme.neutral.green400};
  }
  &::before {
    content: '';
    width: 100px;
    height: 100px;
    position: absolute;
    bottom: -${({ theme }) => theme.spacing[10]};
    right: -${({ theme }) => theme.spacing[10]};
    border-bottom: 4px solid ${({ theme }) => theme.neutral.green400};
    border-right: 4px solid ${({ theme }) => theme.neutral.green400};
  }

  @media (max-width: 960px) {
    max-width: none;
    width: 100%;
    padding: ${({ theme }) => theme.spacing[10]} ${({ theme }) => theme.spacing[6]};

    &::before {
      display: none;
    }
    &::after {
      display: none;
    }
  }
`;

export const FormTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.neutral.white};
  position: absolute;
  top: -27px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    top: -${({ theme }) => theme.spacing[4]};
  }
`;

export const FormButton = styled.button`
  font-size: ${({ theme }) => theme.typography.fontSize['xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.neutral.white};
  padding: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.spacing[1]};
  background-color: ${({ theme }) => theme.neutral.green400};
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.7;
  }
  &:active {
    transform: translateY(2px);
  }
`;
