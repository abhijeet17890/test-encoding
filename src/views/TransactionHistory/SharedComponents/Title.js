import React from "react";
import {Col, Row} from "antd";
import {PageHeading} from "../../../sharedComponents/Heading";
import { StyledSmallDivider } from '../styles';


const StockPageTitle = (props) => {
    return <>
        <Row>
            <Col span={24}>
                <PageHeading>{props.title}</PageHeading>
            </Col>
        </Row>
        <StyledSmallDivider />
    </>;
}

export default StockPageTitle;
