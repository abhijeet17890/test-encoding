import styled from "styled-components";
import { Row, Col, Input, Divider, InputNumber, Select, Button } from "antd";
import "antd/dist/antd.css";

const { Option } = Select;

export const StyledP = styled.p`
    font-family: "Open Sans", sans-serif;
    font-size: 28px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    color: #011c3c;
    margin: 0;
`;

export const StyledCol = styled(Col)`
    width: 50%;
    .ant-select-focused.ant-select-focused.ant-select-focused {
        border: 0px solid black;
    }
`;

export const StyledDivider = styled(Divider)`
    margin: 12px 0;
    .ant-divider-horizontal {
        border: 1px solid;
    }
`;

export const StyledSelect = styled(Select)`
    margin: 20px 0;
    width: 100%;
    .ant-select-selector.ant-select-selector.ant-select-selector {
        height: 36px;
        border-radius: 6px;
        box-shadow: 0 0 0 0;
        border: solid 0.3px rgba(0, 0, 0, 0.16);
    }
    .ant-select-selection-placeholder.ant-select-selection-placeholder.ant-select-selection-placeholder {
        line-height: 36px;
        color: black;
        opacity: 0.8;
    }
`;

export const BlueArrowImage = styled.img`
    height: 6px;
`;

export const StyledOptions = styled(Option)`
    /* font-size: 25px; */
`;

export const StyledButton = styled(Button)`
    top: 336px;
    margin: 0 auto;
    display: block;
    width: 380px;
    height: 57px;
    font-size: 17px;
    border-radius: 6px;
    /* padding: 17px 160px; */
`;
