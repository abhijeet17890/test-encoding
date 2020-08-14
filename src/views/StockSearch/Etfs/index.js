import React from 'react';
import { StockTab } from '../Style';
import PriceTable from "./PriceTable";
import InformationTable from "./InformationTable";
import CumulativeTable from "./CumulativeTable";
import DiscreteTable from "./DiscreteTable";

import 'antd/dist/antd.css';


const { TabPane } = StockTab;

function callback(key) {
  console.log(key);
}
const Etfs = (props) => {

   return (
      <StockTab defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Price" key="1">
          <PriceTable stockInfo={props.stockInfo}/>
        </TabPane>
        {/* <TabPane tab="Information" key="2">
          <InformationTable stockInfo={props.stockInfo}/>
        </TabPane> */}
        <TabPane tab="Cumulative Performance" key="3">
          <CumulativeTable stockInfo={props.stockInfo}/>
        </TabPane>
        <TabPane tab="Discrete Performance" key="4">
          <DiscreteTable stockInfo={props.stockInfo}/>
        </TabPane>
      </StockTab>
   )
 }
 
 export default Etfs;
