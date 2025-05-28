import styled from 'styled-components';

export const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: lightgrey;
  min-height: 460px;

  & .custom-marker {
    cursor: pointer;
  }

  @media (max-width: 620px) {
    min-height: 360px;
    max-height: 360px;
  }
`;
