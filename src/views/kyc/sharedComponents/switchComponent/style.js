import styled from "styled-components";
import { Typography, Col } from "antd";

export const SwitchTitle = styled(Typography)`
  font-size: ${(props)=>props.theme.fontConfig.bodyTextFontSize};
  font-weight: ${(props)=>props.theme.fontConfig.fontWeight2};
  line-height: 1.38;
  letter-spacing: normal;
  color: ${(props)=>props.theme.colors.bodyPrimaryTextColor};
  &.space {
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;
export const StyledCol = styled(Col)`
  text-align: right;
`;
