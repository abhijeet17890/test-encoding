import React from "react";
import {Col, Row} from "antd";
import Divider from '../../../sharedComponents/Divider';
import {PageHeading} from '../../../sharedComponents/Heading';


const PageTitle = () => {
    return <div>
        <Row gutter={[0, 40]}>
            <Col span={24}>
                <PageHeading>Accounts Overview</PageHeading>
                <Divider />
            </Col>
        </Row>
    </div>;
}

export default PageTitle;
