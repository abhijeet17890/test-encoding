import React from 'react';

import { PageHeading } from '../../sharedComponents/Heading';
import Divider from '../../sharedComponents/Divider/index';
import { Button } from '../../sharedComponents/button/index';

import { Row, Col,Space } from 'antd';


import * as S from './styles';

function OrderConfirmation() {
    return(
        <React.Fragment>
            <Row justify='center'>
                <Col lg={{span:9}} xs={23} sm={11}>
                    <PageHeading>Order Confirmation</PageHeading>
                    <S.StyledDivider/>
                </Col>
            </Row>
            <Row justify='center'>
                <Col lg={{span:9}} xs={23} sm={11}>
                    <S.MarketStatus>The market is closed. Your order has been placed and will be
                    executed once the market opens</S.MarketStatus>
                </Col>
            </Row>

            <Row justify='center' gutter={[0,10]}>
                <Col lg={{span:6}} xs={17} sm={8}>
                    <S.StyledParameter>Order Number</S.StyledParameter>
                </Col>
                <Col lg={{span:3}} xs={6} sm={3}>
                    <S.StyledValues>EFXM000103</S.StyledValues>
                </Col>
            </Row>

            <Row justify='center' gutter={[0,10]}>
                <Col lg={{span:6}} xs={17} sm={8}>
                    <S.StyledParameter>Order Status</S.StyledParameter>
                </Col>
                <Col lg={{span:3}} xs={6} sm={3}>
                    <S.StyledValues>Submitted</S.StyledValues>
                </Col>
            </Row>

            <Row justify='center' gutter={[0,10]}>
                <Col lg={{span:6}} xs={6} sm={3} md={3}>
                    <S.StyledParameter>Account</S.StyledParameter>
                </Col>
                <Col lg={{span:3}} xs={17} sm={8} md={8}>
                    <S.StyledValues>Kelly Halt / DPKU000001</S.StyledValues>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,10]}>
                <Col lg={{span:6}} xs={17} sm={8}>
                    <S.StyledParameter>Instrument:</S.StyledParameter>
                </Col>
                <Col lg={{span:3}} xs={6} sm={3}>
                    <S.StyledValues>Apple (AAPL)</S.StyledValues>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,10]}>
                <Col lg={{span:6}} xs={17} sm={8}>
                    <S.StyledParameter>Buy/Sell</S.StyledParameter>
                </Col>
                <Col lg={{span:3}} xs={6} sm={3}>
                    <S.StyledValues>Sell</S.StyledValues>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,10]}>
                <Col lg={{span:6}} xs={17} sm={8}>
                    <S.StyledParameter>Order Type: </S.StyledParameter>
                </Col>
                <Col lg={{span:3}} xs={6} sm={3}>
                    <S.StyledValues>Market Order</S.StyledValues>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,10]}>
                <Col lg={{span:6}} xs={17} sm={8}>
                    <S.StyledParameter>Current Price</S.StyledParameter>
                </Col>
                <Col lg={{span:3}} xs={6} sm={3}>
                    <S.StyledValues>$266.51</S.StyledValues>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,10]}>
                <Col lg={{span:6}} xs={17} sm={8}>
                    <S.StyledParameter>Number of Units</S.StyledParameter>
                </Col>
                <Col lg={{span:3}} xs={6} sm={3}>
                    <S.StyledValues>100.0000</S.StyledValues>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,10]}>
                <Col lg={{span:6}} xs={17} sm={8}>
                    <S.StyledParameter>Estimated Value</S.StyledParameter>
                </Col>
                <Col lg={{span:3}} xs={6} sm={3}>
                    <S.StyledValues>$26,651.00</S.StyledValues>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,15]}>
                <Col lg={{span:6}} xs={17} sm={8}>
                    <S.StyledParameter>Fees & Taxes</S.StyledParameter>
                </Col>
                <Col lg={{span:3}} xs={6} sm={3}>
                    <S.StyledValues>$4.99</S.StyledValues>
                </Col>
            </Row>

            <Row justify='center' gutter={[0,10]}>
                <Col lg={{span:9}} xs={23} sm={11}>
                    <S.StyledDivider dashed={true} colored/>
                </Col>
            </Row>

            <Row justify='center' gutter={[0,40]}>
                <Col lg={{span:6}} xs={17} sm={8}>
                    <S.StyledParameter>Total Cost</S.StyledParameter>
                </Col>
                <Col lg={{span:3}} xs={6} sm={3}>
                    <S.StyledValues>$26,655.99</S.StyledValues>
                </Col>
            </Row>

            <Row justify='center'>
                <Col>
                    <Space horizontal size={10}>
                    <Button outlined size={'md-1'}>View Orders</Button>
                    <Button size={'md-1'}>Account Summary</Button>
                    </Space>
                </Col>
            </Row>
           
        </React.Fragment>
    );

}

export default OrderConfirmation;