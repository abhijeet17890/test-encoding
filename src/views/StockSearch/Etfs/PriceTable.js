import React from 'react';
import { StockTable,StyledUp, StyledDown } from '../Style';
import 'antd/dist/antd.css';
import ButtonWrape from '../Common/const';
import {defaultValues} from '../../../constants/defaultValues';
import {applyAmountCommaMask} from '../../../utils/dataManipulation';

const negativeValShow = (num) =>{
  if(num >= 0){
    return '+ '+defaultValues.defaultCurrency+applyAmountCommaMask(num)
  }else{
    return '- '+defaultValues.defaultCurrency+applyAmountCommaMask(num).slice(1,)
  }
}

const columns = [
   {
     title: 'Name',
     dataIndex: 'name',
     filterMultiple: false,
     width: '40%',
     // specify the condition of filtering result
     // here is that finding the name started with `value`
     onFilter: (value, record) => record.name.indexOf(value) === 0,
     sorter: (a, b) => a.name.length - b.name.length,
     sortDirections: ['descend', 'ascend'],
   },
   {
     title: 'Bid',
     dataIndex: 'buy',
     width: '10%',
     sortDirections: ['descend', 'ascend'],
     sorter: (a, b) => a.buy - b.buy,
   },
   {
     title: 'Ask',
     dataIndex: 'sell',
     width: '10%',
     sortDirections: ['descend', 'ascend'],
     sorter: (a, b) => a.sell - b.sell,
   },
   {
     title: 'Day Change',
     dataIndex: 'change',
     filterMultiple: false,
     width: '20%',
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
   }, //CORRECT THIS: HREF IS GETTING USED IN  BUTTON IS GETTING USED
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
  let vals = '';
  if(props.stockInfo.length > 0){
    props.stockInfo.map((x,index)=>(
      vals = x.instrument_details.day_change_percent!== null?'('+applyAmountCommaMask(x.instrument_details.day_change_percent)+'%)':'',
      // x.instrument_details.bid_price !== null && x.instrument_details.ask_price !== null && x.instrument_details.day_change!==null?
        lisData.push(
          {
            key: index,
            name: x.name,
            buy: x.instrument_details.bid_price!== null?x.instrument_details.bid_price > 0?defaultValues.defaultCurrency+applyAmountCommaMask(x.instrument_details.bid_price):defaultValues.defaultCurrency+applyAmountCommaMask(x.instrument_details.bid_price).slice(1,):'-',
            sell: x.instrument_details.ask_price!== null?x.instrument_details.ask_price > 0?defaultValues.defaultCurrency+applyAmountCommaMask(x.instrument_details.ask_price):defaultValues.defaultCurrency+applyAmountCommaMask(x.instrument_details.ask_price).slice(1,):'-',
            change: x.instrument_details.day_change!==null?vals===''?defaultValues.defaultCurrency+applyAmountCommaMask(x.instrument_details.day_change):!vals.includes('-')? <StyledUp>{x.instrument_details.day_change<0?negativeValShow(x.instrument_details.day_change):negativeValShow(x.instrument_details.day_change)+[vals.slice(0, 1), '+', vals.slice(1)].join('')}</StyledUp>:<StyledDown>{negativeValShow(x.instrument_details.day_change)+vals}</StyledDown>:'-',
            button: <ButtonWrape id={x.id} symbol={x.symbol} name={x.name}id={x.id}/>
          }
        )
    ))
  }
   return (
      <StockTable columns={columns} dataSource={lisData} onChange={onChange} />
   )
 }
 
 export default CommonTable;