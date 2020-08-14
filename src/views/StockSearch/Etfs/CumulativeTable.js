import React from 'react';

import { StockTable , StyledDown, StyledUp} from '../Style';
import 'antd/dist/antd.css';
import ButtonWrape from '../Common/const';
import {defaultValues} from '../../../constants/defaultValues';
import {applyAmountCommaMask} from '../../../utils/dataManipulation';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filterMultiple: false,
    width: '25%',
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '3 Month',
    dataIndex: 'date1',
    width: '17%',
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) => a.buy - b.buy,
  },
  {
    title: '6 Month',
    dataIndex: 'date2',
    width: '17%',
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) => a.sell - b.sell,
  },
  {
    title: '1 Year',
    dataIndex: 'date3',
    filterMultiple: false,
    width: '17%',
    onFilter: (value, record) => record.change.indexOf(value) === 0,
    sorter: (a, b) => a.change - b.change,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '3 Year',
    dataIndex: 'date4',
    filterMultiple: false,
    width: '17%',
    onFilter: (value, record) => record.change.indexOf(value) === 0,
    sorter: (a, b) => a.change - b.change,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '5 Year',
    dataIndex: 'date5',
    filterMultiple: false,
    width: '17%',
    onFilter: (value, record) => record.change.indexOf(value) === 0,
    sorter: (a, b) => a.change - b.change,
    sortDirections: ['descend', 'ascend'],
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

const CommonTable = (props) => {
  const lisData = [];
  let vals = '';
  if(props.stockInfo.length > 0){
    props.stockInfo.map((x,index)=>(
      // x.instrument_details.bid_price !== null && x.instrument_details.ask_price !== null && x.instrument_details.day_change!==null?
      lisData.push(
          {
            key: index,
            name: x.name,
            date1: x.instrument_cummulative_performance !== null?x.instrument_cummulative_performance.three_month_value!== null?x.instrument_cummulative_performance.three_month_value > 0?<StyledUp>+{applyAmountCommaMask(x.instrument_cummulative_performance.three_month_value)}</StyledUp>:<StyledDown>{applyAmountCommaMask(x.instrument_cummulative_performance.three_month_value)}</StyledDown>:'-':'-',
            date2: x.instrument_cummulative_performance !== null?x.instrument_cummulative_performance.six_month_value!== null?x.instrument_cummulative_performance.six_month_value > 0?<StyledUp>+{applyAmountCommaMask(x.instrument_cummulative_performance.six_month_value)}</StyledUp>:<StyledDown>{applyAmountCommaMask(x.instrument_cummulative_performance.six_month_value)}</StyledDown>:'-':'-',
            date3: x.instrument_cummulative_performance !== null?x.instrument_cummulative_performance.one_year_value!==null?x.instrument_cummulative_performance.one_year_value > 0 ?<StyledUp>+{applyAmountCommaMask(x.instrument_cummulative_performance.one_year_value)}</StyledUp>:<StyledDown>{applyAmountCommaMask(x.instrument_cummulative_performance.one_year_value)}</StyledDown>:'-':'-',
            date4: x.instrument_cummulative_performance !== null?x.instrument_cummulative_performance.three_year_value!==null?x.instrument_cummulative_performance.three_year_value > 0?<StyledUp>+{applyAmountCommaMask(x.instrument_cummulative_performance.three_year_value)}</StyledUp>:<StyledDown>{applyAmountCommaMask(x.instrument_cummulative_performance.three_year_value)}</StyledDown>:'-':'-',
            date5: x.instrument_cummulative_performance !== null?x.instrument_cummulative_performance.five_year_value!==null?x.instrument_cummulative_performance.five_year_value > 0?<StyledUp>+{applyAmountCommaMask(x.instrument_cummulative_performance.five_year_value)}</StyledUp>:<StyledDown>{applyAmountCommaMask(x.instrument_cummulative_performance.five_year_value)}</StyledDown>:'-':'-',
            button: <ButtonWrape id={x.id} symbol={x.symbol} name={x.name}/>
          }
        )
    ))
  }
   return (
      <StockTable columns={columns} dataSource={lisData} onChange={onChange} />
   )
 }
 
 export default CommonTable;