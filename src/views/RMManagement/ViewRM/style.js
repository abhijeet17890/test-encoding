import styled from "styled-components";
import { Row } from "antd";

export const StyleLabel = styled.p`
  font-weight: ${(props) => props.theme.fontConfig.fontWeight2};
  line-height: 1.25;
  text-align: left;

  &.heading {
    color: #6c6c6c;
    margin-bottom: 0px;
  }

  &.content {
    color: ${(props) => props.theme.colors.h2Color};
    margin-top: 8px;
    margin-bottom: 0px;
  }
`;

export const RMContent = styled.div`
  margin: 0px 30px;

  @media (max-width: 480px) {
    margin: 0px 0px;
  }
`;

export const RMButtons = styled.div`
  margin: 30px 0px;
  margin-top: 107px;
  @media (max-width: 1280px) {
    margin-top: 107px;
  }
`;


export const StyledRow = styled(Row)`
  &.first-cont {
    margin-top: 27.5px;
  }

  &.seco-cont {
    margin-top: 39px;
  }

  &.third-cont {
    margin-top: 33px;
  }

  &.forth-cont{
    margin-top: 42px;
  }
`;
