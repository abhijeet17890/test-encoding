import styled from "styled-components";
import { Row } from "antd";

export const WarningMessage = styled.span`
  opacity: 0.67;
  font-size: 14px;
  font-style: italic;
  line-height: 1.36;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  margin-top: 15px;
  display: inline-block;
`;

export const StyledRow = styled(Row)`
  margin-bottom: ${(props) => props.theme.elementDistances.h1DisTop};
  margin-top: ${(props) => props.theme.elementDistances.h1DisBottom};
`;

