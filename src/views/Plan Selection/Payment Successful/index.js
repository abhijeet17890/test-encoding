import React, { useRef, useEffect } from "react";
import { Row, Col, Divider, Input, Checkbox, Form } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import {
    StyledRow,
    StyledImg,
    StyledHeading,
    StyledP,
    MarginedCol,
    StyledBeginKycButton,
} from "./styles";
import { Button } from "../../../sharedComponents/button/index";

import paymentSuccessfulImg from "../../../assets/paymentSuccessful.png";
import { routes } from "../../../constants/routes";
import {
    PageHeading,
    SubHeading,
} from "../../../sharedComponents/Heading/index";

const PaymentSuccessfulScreen = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        window.scrollTop = 0;
    }, []);
    const history = useHistory();
    const location = useLocation();
    const paymentResponse = location.state.paymentResponse;
    var amount = `₹ ${paymentResponse.amount}`.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
    );
    return (
        <>
            <StyledRow justify="center">
                <Col>
                    <StyledImg
                        alt="Payment Successful"
                        src={paymentSuccessfulImg}
                    />
                </Col>
            </StyledRow>
            <Row justify="center">
                <Col>
                    <PageHeading>Payment Successful</PageHeading>
                </Col>
            </Row>
            <Row justify="center">
                <MarginedCol>
                    <StyledP>Payment amount</StyledP>
                    <StyledP>{amount}</StyledP>
                </MarginedCol>
            </Row>
            {/* <Row justify="center">
                <MarginedCol>
                    <StyledP>Payment reference number</StyledP>
                    <StyledP></StyledP>
                </MarginedCol>
            </Row> */}
            <Row justify="center">
                <Col>
                    <Button
                        size="lg"
                        onClick={() =>
                            history.push(routes.authRoutes.advisorSelection)
                        }>
                        Continue
                    </Button>
                    {/* <StyledBeginKycButton
                        onClick={() =>
                            history.push(routes.authRoutes.advisorSelection)
                        }
                        type="primary">
                        Begin KYC
                    </StyledBeginKycButton> */}
                </Col>
            </Row>
        </>
    );
};

export default PaymentSuccessfulScreen;
