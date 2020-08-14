import styled from "styled-components";
import { Row, Col, Input, Divider, InputNumber, Select, Form } from "antd";
import "antd/dist/antd.css";

export const StyledCol = styled(Col)`
    width: 50%;
`;

export const HeadingCol = styled(Col)`
    width: 50%;
    font-size: 28px;
    color: #011c3c;
`;

export const StyledDivider = styled(Divider)`
    border-top: 1.5px solid #c6c8c7;
    opacity: 0.5;
    margin: 17.5px 0 18.5px 0;
`;

export const StyledP = styled.p`
    margin: 0;
    font-size: 28px;
    color: #011c3c;
    font-weight: 600;
`;

export const StyledH1 = styled.h1`
    font-size: 28px;
    margin: 0;
    font-weight: 600;
    color: #1d1d1d;
`;

export const StyledH2 = styled.h3`
    margin: 0 0 26px 0;
    font-size: 18px;
    font-weight: 600;
    color: #1d1d1d;
`;

export const StyledFormItem = styled(Form.Item)`
    .ant-form-item-explain.ant-form-item-explain {
        font-style: italic;
    }
    label {
        font-size: 16px;
    }
    .ant-form-item-label {
        padding: 0;
    }

    .ant-input {
        border-radius: 6px;
        height: 36px;
    }
`;
