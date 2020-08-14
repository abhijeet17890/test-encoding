import styled from "styled-components";
import { Input, InputNumber } from "antd";

// import "antd/dist/antd.css";
export const StyledInput = styled(Input)`
    font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
    border-radius: ${(props) => props.theme.generalConfig.inputBorderRadius};
    height: ${(props) => (props.suffix ? null : "36px")};
    padding: ${(props) => (props.suffix ? 0 : "4px 11px")};
    box-shadow: none;
    input {
        ::placeholder {
            font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
            color: ${(props) => props.theme.colors.placeholderColor};
        }
    }
    ::placeholder {
        /* line-height: 22px; */
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
    span {
        padding: 0 10px;
    }
    .ant-input.ant-input {
        font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
        padding: 4px 11px;
        height: 36px;
        border-radius: ${(props) =>
            props.theme.generalConfig.inputBorderRadius};
    }
`;

export const StyledNumberInput = styled(InputNumber)`
    width: 100%;
    height: 36px;
    border-radius: ${(props) => props.theme.generalConfig.inputBorderRadius};
    .ant-input-number-input-wrap {
        input {
            color: ${(props) => props.theme.colors.placeholderColor};
            font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
        }
    }
    .ant-input-number-input {
        height: 36px;
    }
    .ant-input-number-handler-wrap {
        display: none;
    }
    .ant-form-item-label > label.ant-form-item-required::before {
        content: none;
    }

    @media (max-width: 1000px) {
        height: 30px;
        .ant-input-number-input {
            height: 30px;
        }
    }
`;
