import React from "react";
import {Col, Row, Typography} from "antd";
import {StyledDivider, StyledTitle} from './styles';
import {PageHeading} from '../../sharedComponents/Heading/index';
import Divider from '../../sharedComponents/Divider/index';


const { Title } = Typography;
const PageTitle = () => {
    return <div>
        <Row >
            <Col span={24}>
                <PageHeading >Recommended Portfolios</PageHeading>
            </Col>
        </Row>
        <Divider />
    </div>;
}

export default PageTitle;
