import styled from "styled-components";
import { Select } from "antd";
const { Option } = Select;

// import "antd/dist/antd.css";
export const StyledSelect = styled(Select)`
    width: 100%;
    font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};

    .ant-select-selector.ant-select-selector.ant-select-selector {
        height: 36px;
        border-radius: ${(props) =>
            props.theme.generalConfig.inputBorderRadius};
        box-shadow: none;
        :hover {
            border-color: ${(props) => props.theme.colors.hoverInputBorder};
        }
        :focus {
            border-color: ${(props) => props.theme.colors.focusedInputBorder};
            box-shadow: none;
        }
    }

    .ant-select-selector .ant-select-selection-placeholder {
        font-size: 16px;
        line-height: 34px;
        ::placeholder {
            color: red;
        }
    }
`;

export { Option };
