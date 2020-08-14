import React from 'react';
import { StockTable, StyledUp, StyledDown} from './styles';
import 'antd/dist/antd.css';
import ButtonWrape from './ButtonWrape';
import {defaultValues} from '../../../constants/defaultValues';
import {applyAmountCommaMask} from '../../../utils/dataManipulation';

const columns = [
   {
     title: 'Account Name',
     dataIndex: 'name',
     filterMultiple: false,
     width: '18%',
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
     width: '15%',
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
          name: x.accountSummary.accountName !== null? x.accountSummary.accountName:'--' ,
          no: x.accountSummary.accountNo,
          sval: x.instrument_overview.stock_value!== null?defaultValues.defaultCurrency + applyAmountCommaMask(x.instrument_overview.stock_value):'',
          Csell: x.instrument_overview.cash_value!== null?defaultValues.defaultCurrency + applyAmountCommaMask(x.instrument_overview.cash_value):'',
          Gl: vals = x.instrument_overview.total_value!==null?vals===''?defaultValues.defaultCurrency+applyAmountCommaMask(x.instrument_overview.total_value):!vals.includes('-')? <StyledUp>{defaultValues.defaultCurrency+applyAmountCommaMask(x.instrument_overview.total_value)+[vals.slice(0, 2), '+', vals.slice(2)].join('')}</StyledUp>:<StyledDown>{'- '+defaultValues.defaultCurrency+applyAmountCommaMask(x.instrument_overview.total_value).slice(1,)+vals}</StyledDown>:'',
          // Gl: <StyledUp>+{defaultValues.defaultCurrency + x.instrument_overview.total_value+'(+'+ defaultValues.defaultCurrency + x.instrument_overview.total_gain_or_loss_percent+')'}</StyledUp>,
          button: <ButtonWrape handleClick={props.handleClick}/>
        }
      ):props.info.length>2?
      lisData.push(
        {
          key: index,
          name: 'Total',
          sval: x.total_stock_value!== null?defaultValues.defaultCurrency + applyAmountCommaMask(x.total_stock_value):'',
          Csell: x.total_cash_value!== null?defaultValues.defaultCurrency + applyAmountCommaMask(x.total_cash_value):'',
          Gl: x.total_value!==null?vals===''?defaultValues.defaultCurrency+applyAmountCommaMask(x.total_value):!vals.includes('-')? <StyledUp>{defaultValues.defaultCurrency+applyAmountCommaMask(x.total_value)+[vals.slice(0, 2), '+', vals.slice(2)].join('')}</StyledUp>:<StyledDown>{defaultValues.defaultCurrency+applyAmountCommaMask(x.total_value)+vals}</StyledDown>:'',
        }
      ):null
    ))
  }

   return (
      <StockTable columns={columns} dataSource={lisData} onChange={onChange} loading={props.loading}/>
      // <StockTable columns={columns} dataSource={data} onChange={onChange} />
   )
 }
 
 export default Table;