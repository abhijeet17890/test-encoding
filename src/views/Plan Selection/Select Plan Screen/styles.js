import styled from "styled-components";
import { Row, Col, Button, Card, Divider } from "antd";
import "antd/dist/antd.css";
import { LoadingOutlined } from "@ant-design/icons";

export const LoadingIcon = styled(LoadingOutlined)`
    font-size: 30px;
`;

export const MarginedRow = styled(Row)`
    margin: 54px 0 67.8px 0;
`;

export const WrapperCard = styled(Card)`
    /* font-family: "Open Sans", sans-serif; */
    margin: 0 22px;
    overflow: hidden;
    cursor: pointer;
    border-radius: 16px;
    box-shadow: 0px 3px 36px 0px rgba(0, 0, 0, 0.16);
    width: 252.7px;
    height: 321.7px;
    border: ${(props) =>
        props.selected?.name === props.name
            ? `${props.theme.generalConfig.cardBorderRadius} solid ${props.theme.colors.successColor}`
            : `${props.theme.generalConfig.cardBorderRadius} solid ${props.theme.colors.cardBorderColor}`};
    @media only screen and (max-width: 1000px) {
        width: 200px;
        height: 253px;
    }

    .ant-card-cover img {
        border-radius: 6px;
    }
`;

export const InnerCard = styled(Card)`
    .ant-card-body {
        padding: 0px;
    }
`;

export const StyledImg = styled.img`
    width: 182px;
    height: 113.7px;
    margin: 0 auto;
    @media only screen and (max-width: 1000px) {
        width: 142px;
        height: 89px;
    }
`;

export const StyledImgDiv = styled.div`
    width: 182px;
    height: 113.7px;
    margin: 0 auto;
    @media only screen and (max-width: 1000px) {
        width: 142px;
        height: 89px;
    }
`;

export const CardHeading = styled(Col)`
    height: 22px;
    /* font-family: "Open Sans", sans-serif; */
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.16px;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.56;
    text-align: center;
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
    @media only screen and (max-width: 1000px) {
        font-size: 12px;
    }
`;

export const HeadingRow = styled(Row)`
    margin-top: 6.7px;
`;

export const BodyRow1 = styled(Row)`
    margin-top: 18px;
    @media only screen and (max-width: 1000px) {
        margin-top: 4px;
    }
`;

export const BodyRow1Col1 = styled(Col)`
    text-align: start;
    /* font-family: "Open Sans", sans-serif; */
    font-size: 12px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.92;
    letter-spacing: -0.12px;
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
    @media only screen and (max-width: 1000px) {
        text-align: start;
        font-size: 10px;
    }
`;

export const BodyRow1Col2 = styled(Col)`
    /* font-family: "Open Sans", sans-serif; */
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.92;
    letter-spacing: -0.12px;
    text-align: end;
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
    @media only screen and (max-width: 1000px) {
        text-align: start;
        font-size: 10px;
    }
`;

export const StyledDivider = styled(Divider)`
    margin: 12px -24px;
    width: auto;
    border-top: 1px solid ${(props) => props.theme.colors.dividerLineColor};
    opacity: 0.5;
    @media only screen and (max-width: 1000px) {
        margin: 4px -24px;
    }
`;

export const StyledUl = styled.ul`
    padding: 0 16px;
    /* font-family: "Open Sans", sans-serif; */
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: left;
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
    @media only screen and (max-width: 1000px) {
        font-size: 10px;
    }
`;

export const TickDiv = styled.div`
    width: 100px;
    height: 100px;
    background-color: ${(props) => props.theme.colors.successColor};
    position: absolute;
    z-index: 0;
    transform: rotate(45deg) translate(-90px, 0px);
    top: 0;
    left: 0;
`;

export const Tick = styled.div`
    color: ${(props) => props.theme.colors.btnTextColor};
    transform: rotate(-45deg) translate(45px, 55px);
    font-size: 20px;
`;
