import React from "react";
import {Col, Divider, Row, Typography} from "antd";
import { StyledSmallDivider } from './Style';
import {PageHeading} from '../../sharedComponents/Heading';


const { Title } = Typography;
const StockPageTitle = () => {
    return <div>
        <Row >
            <Col span={24}>
                <PageHeading >My Clients</PageHeading>
            </Col>
        </Row>
        <StyledSmallDivider />
    </div>;
}

export default StockPageTitle;
