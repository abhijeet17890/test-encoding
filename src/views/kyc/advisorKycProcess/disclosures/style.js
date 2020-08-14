import styled from "styled-components";
import { List } from "antd";

export const CustomList = styled(List)`
  margin-bottom: 150px;
  &.ant-list-split .ant-list-item {
    border-bottom: 1px solid ${(props) => props.theme.colors.dividerLineColor};
  }
  span,
  a {
    font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  }
  a {
    text-decoration: underline;
    margin-left: 11px;
  }
`;
