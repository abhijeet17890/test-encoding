import React from "react";
import {Col, Divider, Row, Typography} from "antd";
import {StyledDivider, StyledTitle} from './styles';


const { Title } = Typography;
const StockPageTitle = () => {
    return <div>
        <Row >
            <Col span={24}>
                <StyledTitle>
                    <Title level={2}>Select Funds</Title>
                </StyledTitle>
            </Col>
        </Row>
        <StyledDivider></StyledDivider>
    </div>;
}

export default StockPageTitle;
