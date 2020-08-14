import React from "react";
import {Col, Row} from "antd";
import Divider from '../../../sharedComponents/Divider/index';
import {PageHeading} from '../../../sharedComponents/Heading/index';


const StockPageTitle = (props) => {
    return <div>
        <Row gutter={[0, 40]}>
            <Col span={24}>
                {props.val==='shares'?<PageHeading>Stock Search</PageHeading>:null}
                {props.val==='etf'?<PageHeading>ETFs Search</PageHeading>:null}
                <Divider />
            </Col>
        </Row>
    </div>;
}

export default StockPageTitle;
