import React from 'react';
import { StockTable , StyledUp} from '../Style';
import 'antd/dist/antd.css';
import ButtonWrape from '../Common/const';
import {defaultValues} from '../../../constants/defaultValues';
import {applyAmountCommaMask} from '../../../utils/dataManipulation';

function nFormatter(num, digits) {
  var si = [
    // { value: 1, symbol: "" },
    // { value: 1E3, symbol: "k" },
    { value: 1e6, symbol: " M" },
    // { value: 1E9, symbol: "G" },
    // { value: 1E12, symbol: "T" },
    // { value: 1E15, symbol: "P" },
    // { value: 1E18, symbol: "E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

const columns = [
   {
     title: 'Name',
     dataIndex: 'name',
     filterMultiple: false,
     width: '32%',
     // specify the condition of filtering result
     // here is that finding the name started with `value`
     onFilter: (value, record) => record.name.indexOf(value) === 0,
     sorter: (a, b) => a.name.length - b.name.length,
     sortDirections: ['descend', 'ascend'],
   },
   {
     title: 'Market Cap',
     dataIndex: 'buy',
     width: '15%',
     sortDirections: ['descend', 'ascend'],
     sorter: (a, b) => a.buy - b.buy,
   },
   {
     title: 'P/E',
     dataIndex: 'sell',
     width: '10%',
     sortDirections: ['descend', 'ascend'],
     sorter: (a, b) => a.sell - b.sell,
   },
   {
     title: 'Dividend Yield',
     dataIndex: 'Yield',
     width: '10%',
     sortDirections: ['descend', 'ascend'],
     sorter: (a, b) => a.sell - b.sell,
   },
   {
     title: 'Price to Book',
     dataIndex: 'change',
     filterMultiple: false,
     width: '13%',
     onFilter: (value, record) => record.change.indexOf(value) === 0,
     sorter: (a, b) => a.change - b.change,
     sortDirections: ['descend', 'ascend'],
   },
   {
     title: '',
     dataIndex: 'button',
     width: '30%',
   },
 ];
 
 const data = [
   {
     key: '1',
     name: 'AAPL | Apple',
     buy: 32,
     sell: 32,
     change: 20.45,
     button: <ButtonWrape />
   },
   {
     key: '2',
     name: 'AAPL | Apple',
     buy: 42,
     sell: 32,
     change: 25.45,
     button: <ButtonWrape />
   },
   {
     key: '3',
     name: 'AAPL | Apple',
     buy: 32,
     sell: 32,
     change: 24.45,
     button: <ButtonWrape />
   },
   {
     key: '4',
     name: 'AAPL | Apple',
     buy: 32,
     sell: 34,
     change: 20.45,
     button: <ButtonWrape />
   },
 ];

 function onChange(pagination, filters, sorter, extra) {
   console.log('params', pagination, filters, sorter, extra);
 }

const CommonTable = (props) => {
  const lisData = [];
  if(props.stockInfo.length > 0){
    props.stockInfo.map((x,index)=>(
      // x.instrument_details.bid_price !== null && x.instrument_details.ask_price !== null && x.instrument_details.day_change!==null?
        lisData.push(
          {
            key: index,
            name: x.name,
            buy: x.instrument_details.market_cap!== null?defaultValues.defaultCurrency+nFormatter(x.instrument_details.market_cap,2):'-',
            sell: x.instrument_details.pe_ratio!== null?applyAmountCommaMask(x.instrument_details.pe_ratio):'-',
            Yield: x.instrument_details.dividend_yield!== null?applyAmountCommaMask(x.instrument_details.dividend_yield):'-',
            change: x.instrument_details.pb_ratio!==null?applyAmountCommaMask(x.instrument_details.pb_ratio):'-',
            button: <ButtonWrape id={x.id} symbol={x.symbol} name={x.name} id={x.id}/>
          }
        )
    ))
  }
   return (
      <StockTable columns={columns} dataSource={lisData} onChange={onChange} />
   )
 }
 
 export default CommonTable;