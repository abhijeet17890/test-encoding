import styled from "styled-components";
import { Row, Col, Card, Divider, Form, Input, InputNumber } from "antd";
import { Button } from "../../../sharedComponents/button/index";
import "antd/dist/antd.css";

export const StyledRow = styled(Row)`
    margin-top: 19.5px;
`;

export const StyledFormItem = styled(Form.Item)`
    margin-bottom: 19px;
    label {
        font-size: ${(prop) => prop.theme.fontConfig.bodyTextFontSize};
    }
`;

export const StyledReferralInput = styled(Input)`
    border-radius: ${(prop) => prop.theme.fontConfig.inputBorderRadius};
    height: 36px;
    width: 46px;
    @media (max-width: 850px) {
        height: 30px;
        width: 36px;
    }
    @media (max-width: 1000px) {
        width: 36px;
        height: 30px;
    }
`;

export const ReferralFormItem = styled(Form.Item)`
    .ant-form-item-control-input-content {
        display: flex;
    }
    label {
        font-size: ${(prop) => prop.theme.fontConfig.bodyTextFontSize};
    }
`;

export const StyleOtpBoxes = {
    width: "46px",
    height: "36px",
    borderRadius: "6px",
    border: " solid 0.3px grey",
    color: "black",
    type: "text",
    // webkitTextSecurity: "disc",
};

export const MarginedCol = styled(Col)`
    margin-top: 34px;
`;

export const SeperatorSpan = styled.span`
    padding-left: 20px;
`;

export const StyledApplyButton = styled(Button)`
    margin-left: 20px;
`;

export const CouponSuccess = styled.span`
    color: ${(props) => props.theme.colors.successColor};
`;

export const CouponError = styled.span`
    color: ${(props) => props.theme.colors.errorColor};
`;
export const RightCol = styled(Col)`
    margin-left: 19px;
`;
