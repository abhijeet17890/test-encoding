import styled from "styled-components";
import { Radio } from "antd";

export const CustomRadio = styled(Radio)`
    span {
        font-size: 16px;
    }
    &.ant-radio-wrapper:hover {
        .ant-radio-inner {
            border-color: ${(props) => props.theme.colors.radioHoverBorder};
        }
    }
    &.ant-radio-wrapper .ant-radio-inner {
        width: ${(props) => props.theme.generalConfig.radioWidth};
        height: ${(props) => props.theme.generalConfig.radioHeight};
        border-radius: ${(props) =>
            props.theme.generalConfig.radioBorderRadius};
        border: 1px solid ${(props) => props.theme.colors.radioDefaultBorder};
        &::after {
            width: 13px;
            height: 13px;
        }
    }
    &.ant-radio-wrapper.ant-radio-wrapper-disabled .ant-radio-inner {
        background-color: #fff;
    }
    &.ant-radio-wrapper-selected .ant-radio-inner {
        border: none;
        background-color: ${(props) =>
            props.theme.colors.radioSelectedBackground};
    }
    &.ant-radio-wrapper-selected.ant-radio-wrapper-disabled .ant-radio-inner {
        border: none;
        background-color: ${(props) =>
            props.theme.colors.radioDisabledBackground};
    }
`;
