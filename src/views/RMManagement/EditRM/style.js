import styled from "styled-components";

export const RMContent = styled.div`
  margin: 31.5px 15.5px 0px 18.5px;

  @media (max-width: 1280px) {
    margin: 31.5px 15.5px 0px 18.5px;
  }

  @media (max-width: 480px) {
    margin: 0px 0px;
  }
`;

export const RMButtons = styled.div`
  margin-top: 170px;

  &.button {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 480px) {
    margin: 30px 0px;
  }
`;
