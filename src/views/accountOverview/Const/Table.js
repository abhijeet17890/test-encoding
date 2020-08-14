import React from 'react';
import { StockTable, StyledUp, StyledDown} from '../styles';
import 'antd/dist/antd.css';
import ButtonWrape from './ButtonWrape';
import {defaultValues} from '../../../constants/defaultValues';
import {capitaliseFirstChar,applyAmountCommaMask} from '../../../utils/dataManipulation';

const negativeValShow = (num) =>{
  if(num >= 0){
    return '+ '+defaultValues.defaultCurrency+applyAmountCommaMask(num)
  }else{
    return '- '+defaultValues.defaultCurrency+applyAmountCommaMask(num).slice(1,)
  }
}

const columns = [
   {
     title: 'Account Name',
     dataIndex: 'name',
     filterMultiple: false,
     width: '15%',
     // specify the condition of filtering result
     // here is that finding the name started with `value`
   },
   {
     title: 'Account Number',
     dataIndex: 'no',
     width: '15%',
   },
   {
     title: 'Stock Value',
     dataIndex: 'sval',
     width: '15%',
   },
   {
     title: 'Cash Value',
     dataIndex: 'Csell',
     width: '15%',
   },
   {
     title: 'Total Gain/Loss',
     dataIndex: 'Gl',
     filterMultiple: false,
     width: '20%',
   },
   {
     title: '',
     dataIndex: 'button',
     width: '20%',
   },
 ];

 function onChange(pagination, filters, sorter, extra) {
   console.log('params', pagination, filters, sorter, extra);
 }

const Table = (props) => {
  const lisData = [];
  let vals = '';
  console.log(props.info);
  if(props.info.length > 0){
    props.info.map((x,index)=>(
      x.accountSummary !== undefined?vals = x.instrument_overview.total_gain_or_loss_percent!== null?' ('+applyAmountCommaMask(x.instrument_overview.total_gain_or_loss_percent)+'%)':'':vals = x.total_gain_or_loss_percent!== null?' ('+applyAmountCommaMask(x.total_gain_or_loss_percent)+'%)':'',
      x.accountSummary !== undefined?
        lisData.push(
          {
            key: index,
            name: capitaliseFirstChar(x.accountSummary.accountName !== null? x.accountSummary.accountName:'--' ),
            no: x.accountSummary.accountNo,
            sval: x.instrument_overview.stock_value!== null?defaultValues.defaultCurrency + applyAmountCommaMask(x.instrument_overview.stock_value):'',
            Csell: x.instrument_overview.cash_value!== null?negativeValShow(x.instrument_overview.cash_value):'',
            Gl: vals = x.instrument_overview.total_value!==null?vals===''?negativeValShow(x.instrument_overview.total_value):vals.includes('0.00')?negativeValShow(x.total_value)+vals:!vals.includes('-')? <StyledUp>{negativeValShow(x.instrument_overview.total_value)+[vals.slice(0, 2), '+', vals.slice(2)].join('')}</StyledUp>:<StyledDown>{negativeValShow(x.instrument_overview.total_value)+vals}</StyledDown>:'',
            // Gl: <StyledUp>+{defaultValues.defaultCurrency + x.instrument_overview.total_value+'(+'+ defaultValues.defaultCurrency + x.instrument_overview.total_gain_or_loss_percent+')'}</StyledUp>,
            button: <ButtonWrape />
          }
        ):props.info.length>2?
        lisData.push(
          {
            key: index,
            name: 'Total',
            sval: x.total_stock_value!== null?defaultValues.defaultCurrency + applyAmountCommaMask(x.total_stock_value):'',
            Csell: x.total_cash_value!== null?negativeValShow(x.total_cash_value):'',
            Gl: x.total_value!==null?vals===''?negativeValShow(x.total_value):vals.includes('0.00')?negativeValShow(x.total_value)+vals:!vals.includes('-')? <StyledUp>{negativeValShow(x.total_value)+[vals.slice(0, 2), '+', vals.slice(2)].join('')}</StyledUp>:<StyledDown>{negativeValShow(x.total_value)+vals}</StyledDown>:'',
          }
        ):null
    ))
  }

   return (
      <StockTable columns={columns} dataSource={lisData} onChange={onChange} />
      // <StockTable columns={columns} dataSource={data} onChange={onChange} />
   )
 }
 
 export default Table;