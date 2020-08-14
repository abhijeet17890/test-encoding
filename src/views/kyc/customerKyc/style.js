import styled from "styled-components";
import { List } from "antd";

export const CustomList = styled(List)`
  &.ant-list-split .ant-list-item {
    border-bottom: none;
  }
  span,
  a {
    font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
    line-height: 1.31;
    letter-spacing: normal;
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  }
  a {
    text-decoration: underline;
  }
  .ant-checkbox-wrapper {
    display: block;
    margin-top: 11px;
    margin-left: 15px;
  }
`;
