import React from "react";
import {Col, Row, Typography} from "antd";
import {StyledSmallDivider,StyledPageHeading} from "../style";


const { Title } = Typography;
const StockPageTitle = (props) => {
    return <>
        <Row>
            <Col span={24}>
                <StyledPageHeading>{props.title}</StyledPageHeading>
            </Col>
        </Row>
        <StyledSmallDivider />
    </>;
}

export default StockPageTitle;
