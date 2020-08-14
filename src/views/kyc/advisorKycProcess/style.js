import { Row, Col } from "antd";
import styled from "styled-components";

export const StyledRow = styled(Row)`
  margin-bottom: ${(props) => props.theme.elementDistances.H1DividerBottomDis};
`;

export const StyledDocumentComponent = styled(Col)`
  margin-bottom: 16px;
  margin-top: 16px;
  color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
`;

export const StyleDocumentUploadButton = styled(Col)`
  margin-top: 12px;
`;
