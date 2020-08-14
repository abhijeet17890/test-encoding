import styled from "styled-components";
import { Col } from "antd";

export const CustomLink = styled.span`
  font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
  line-height: 3;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  margin-left: 13px;
  cursor: pointer;
  text-decoration: underline;
  &:hover,
  &:active {
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
    text-decoration: underline;
  }
  @media (max-width: 480px) {
    margin-bottom: 30px;
    display: inline-block;
  }
`;
export const CustomCol = styled(Col)`
  &.disabled {
    pointer-events: none;
    opacity: 0.4;
  }
  margin-bottom: ${(props) =>
    props.theme.elementDistances.inputVDisFormSubmitBtn};
`;
