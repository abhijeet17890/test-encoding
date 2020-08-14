import React from "react";
import {Col, Row} from "antd";
import Shares from "../Shares";
import Etfs from "../Etfs";

const StockResults = (props) => {
    return  <Row>
        <Col span={24}>
        {props.val==='shares'?<Shares stockInfo={props.stockInfo} />:null}
        {props.val==='etf'?<Etfs stockInfo={props.stockInfo} />:null}
        </Col>
    </Row>;
}

export default StockResults;
