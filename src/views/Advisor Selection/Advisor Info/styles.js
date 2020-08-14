import styled from "styled-components";
import {
    Row,
    Col,
    Input,
    Divider,
    InputNumber,
    Select,
    Form,
    Radio,
    Checkbox,
    Button,
} from "antd";
import { CheckOutlined} from '@ant-design/icons';


export const StyledRadio = styled(Radio)`
    span {
        font-size: 16px;
    }
    .ant-radio-inner.ant-radio-inner {
        width: 22px;
        height: 22px;
        border: solid 1.5px #c6c6c6;
    }
    .ant-radio-inner.ant-radio-inner::after {
        width: 13.7px;
        height: 13.5px;
        transform: scale(1);
    }
`;

export const RadioGroup = styled(Radio.Group)`
    width: 100%;
    label:nth-child(2) {
        margin: 0 75px;
    }
`;

export const FormItem = styled(Form.Item)`
    margin: 0;
    label {
        font-size: 16px;
    }
    .ant-form-item-explain.ant-form-item-explain {
        font-style: italic;
    }
    /* .ant-input-affix-wrapper {
        padding: 0;
        border-radius: 6px;
        .ant-input {
            padding: 4px 11px;
        }
    }
    .ant-input {
        height: 36px;
        border-radius: 6px;
    }
     */
`;

export const ErrorMsg = styled.p`
    font-style: italic;
    color: #ff4d4f;
    font-size: 14px;
    margin-bottom: 32px;
`;

export const SuccessMsg = styled.p`
    font-size: 16px;
    color: #1d1d1d;
    margin: 18px 0 32px 0;
`;

export const RMConfirmErrorMsg = styled.p`
    font-size: 14px;
    color: #ff4d4f;
    margin: 0;
`;

export const StyledSelect = styled(Select)`
    .ant-select-selector.ant-select-selector {
        height: 36px;
        border-radius: 6px;
    }
`;

export const BlueArrowImage = styled.img`
    height: 6px;
`;

export const Tick = styled(CheckOutlined)`
    color:#60cdb3;
`;


export const StyledCheckbox = styled(Checkbox)`
    .ant-checkbox-inner {
        width: 21px;
        height: 21px;
    }
    .ant-checkbox-inner::after {
        width: 6px;
        height: 12px;
    }
`;

export const StyledButtonLarge = styled(Button)`
    width: 380px;
    height: 57px;
    border-radius: 10px;
    margin: 0 auto;
    :disabled {
        background-color: #c5ced4;
        color: #ffffff;
        border: none;
        :hover {
            background-color: #c5ced4;
            color: #ffffff;
        }
    }
`;

export const StyledButtonSmall = styled(Button)`
    height: 36px;
    width: 110px;
    border-radius: 6px;
    :disabled {
        background-color: #c5ced4;
        color: #ffffff;
        border: none;
        :hover {
            background-color: #c5ced4;
            color: #ffffff;
        }
    }
`;

export const StyledInput = styled(Input)`
    span {
        padding: 0 10px;
    }
`;

export const ConfirmButtonCol = styled(Col)`
    display: flex;
    justify-content: flex-end;
`;

export const SubHeadRow = styled(Row)`
    margin-top: 16px;
`;
