import styled from "styled-components";
import {
    Row,
    Col,
    Button,
    Card,
    Divider,
    Form,
    Input,
    InputNumber,
} from "antd";
import "antd/dist/antd.css";

export const StyledRow = styled(Row)`
    margin-top: 19.5px;
`;
export const StyledImg = styled.img`
    width: 160px;
    height: 178px;
`;

export const StyledP = styled.p`
    &:nth-child(1) {
        text-align: center;
        font-size: ${(prop) => prop.theme.fontConfig.bodyTextSmall};
        font-weight: normal;
        margin: 0;
    }
    &:nth-child(2) {
        text-align: center;
        font-size: 26px;
        font-weight: bold;
    }
`;

export const MarginedCol = styled(Col)`
    margin: 15px 0 15px 0;
    @media (max-width: 1000px) {
        margin: 5px 0 5px 0;
    }
`;
