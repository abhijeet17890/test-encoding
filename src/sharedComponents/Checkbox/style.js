import styled from "styled-components";
import { Checkbox } from "antd";

export const CustomCheckbox = styled(Checkbox)`

  &.ant-checkbox-wrapper:hover{
    .ant-checkbox-inner {
      border-color: ${props=>props.theme.colors.checkBoxHoverBorder}; ;
    }
  }
  &.ant-checkbox-wrapper .ant-checkbox-inner {
    width: ${props=>props.theme.generalConfig.checkBoxWidth};
    height: ${props=>props.theme.generalConfig.checkBoxHeight};
    border-radius: ${props=>props.theme.generalConfig.checkBoxBorderRadius};
    border: 1px solid ${props=>props.theme.colors.checkBoxDefaultBorder};
    &::after{
        border-color: #fff;
        border-radius: 7px;
        border-width: 3px;
        width: 6px;
        height: 12px;
    }
  }
  &.ant-checkbox-wrapper.ant-checkbox-wrapper-disabled .ant-checkbox-inner {
    background-color: #fff;
  }
  &.ant-checkbox-wrapper-checked .ant-checkbox-inner {
    border: none;
    background-color: ${props=>props.theme.colors.checkBoxSelectedBackground};
  }
  &.ant-checkbox-wrapper-checked.ant-checkbox-wrapper-disabled .ant-checkbox-inner {
    border: none;
    background-color: ${props=>props.theme.colors.checkBoxDisabledBackground};
  }
`;
