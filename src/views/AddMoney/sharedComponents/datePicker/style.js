import { DatePicker } from "antd";

import styled from "styled-components";

export const StyleDatePicker = styled(DatePicker)`
  height: ${(props) => (props.suffix ? null : "36px")};
  border-radius: ${(props) => props.theme.generalConfig.inputBorderRadius};
  border: 1px solid ${(props) => props.theme.colors.normalInputBorder};
  font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
  line-height: 1.38;
  letter-spacing: normal;
  width: 100%;
  input {
    ::placeholder {
      font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
      color: ${(props) => props.theme.colors.placeholderColor};
    }
  }
  ::placeholder {
    font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
    color: ${(props) => props.theme.colors.placeholderColor};
  }
  :hover {
    border-color: ${(props) => props.theme.colors.hoverInputBorder};
  }
  :focus {
    border-color: ${(props) => props.theme.colors.focusedInputBorder};
    box-shadow: none;
  }
`;
