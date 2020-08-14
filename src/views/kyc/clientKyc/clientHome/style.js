import styled from "styled-components";
import { Result } from "antd";

export const StyledImg = styled.img`
  width: 290.1px;
  height: 279.7px;
  object-fit: contain;
`;
export const StyledResult = styled(Result)`
  .ant-result-subtitle {
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
    width: 72%;
    margin: 0px auto;
    font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
    margin-bottom: ${(props) =>
      props.theme.elementDistances.inputVDisFormSubmitBtn};
  }
`;
