import React from 'react';
import { StockTab } from '../Style';
import PriceTable from "./PriceTable";
import KeyTable from "./KeyTable";

import 'antd/dist/antd.css';


const { TabPane } = StockTab;

function callback(key) {
  console.log(key);
}
const Shares = (props) => {
   return (
      <StockTab defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Price" key="1">
      <PriceTable stockInfo={props.stockInfo} />
    </TabPane>
    <TabPane tab="Key Metrics" key="2">
      <KeyTable stockInfo={props.stockInfo} />
    </TabPane>
  </StockTab>
   )
 }
 
 export default Shares;
