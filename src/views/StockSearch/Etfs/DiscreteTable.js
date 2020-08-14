import React from 'react';
import { StockTable , StyledDown, StyledUp, CenterTable} from '../Style';
import 'antd/dist/antd.css';
import ButtonWrape from '../Common/const';
import {defaultValues} from '../../../constants/defaultValues';
import {applyAmountCommaMask} from '../../../utils/dataManipulation';


function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

 const dateFnc = (date) => {
  return monthNames[new Date(date).getMonth()]+' '+new Date(date).getFullYear().toString().substr(-2);
}
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const CommonTable = (props) => {
  const lisData = [];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filterMultiple: false,
      width: '35%',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: <CenterTable>{props.stockInfo[0].instrument_discrete_performance !== null?props.stockInfo[0].instrument_discrete_performance.five_year_start_date!== null?dateFnc(props.stockInfo[0].instrument_discrete_performance.five_year_start_date):'-':'-'}<br/>to<br/>{props.stockInfo[0].instrument_discrete_performance !== null?props.stockInfo[0].instrument_discrete_performance.four_year_start_date!== null?dateFnc(props.stockInfo[0].instrument_discrete_performance.four_year_start_date):'-':'-'}</CenterTable>,
      dataIndex: 'date1',
      width: '15%',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.buy - b.buy,
    },
    {
      title: <CenterTable>{props.stockInfo[0].instrument_discrete_performance !== null?props.stockInfo[0].instrument_discrete_performance.four_year_start_date!== null?dateFnc(props.stockInfo[0].instrument_discrete_performance.four_year_start_date):'-':'-'}<br/>to<br/>{props.stockInfo[0].instrument_discrete_performance !== null?props.stockInfo[0].instrument_discrete_performance.three_year_start_date!== null?dateFnc(props.stockInfo[0].instrument_discrete_performance.three_year_start_date):'-':'-'}</CenterTable>,
      dataIndex: 'date2',
      width: '15%',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.sell - b.sell,
    },
    {
      title: <CenterTable>{props.stockInfo[0].instrument_discrete_performance !== null?props.stockInfo[0].instrument_discrete_performance.three_year_start_date!== null?dateFnc(props.stockInfo[0].instrument_discrete_performance.three_year_start_date):'-':'-'}<br/>to<br/>{props.stockInfo[0].instrument_discrete_performance !== null?props.stockInfo[0].instrument_discrete_performance.two_year_start_date!== null?dateFnc(props.stockInfo[0].instrument_discrete_performance.two_year_start_date):'-':'-'}</CenterTable>,
      dataIndex: 'date3',
      filterMultiple: false,
      width: '15%',
      onFilter: (value, record) => record.change.indexOf(value) === 0,
      sorter: (a, b) => a.change - b.change,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: <CenterTable>{props.stockInfo[0].instrument_discrete_performance !== null?props.stockInfo[0].instrument_discrete_performance.two_year_start_date!== null?dateFnc(props.stockInfo[0].instrument_discrete_performance.two_year_start_date):'-':'-'}<br/>to<br/>{props.stockInfo[0].instrument_discrete_performance !== null?props.stockInfo[0].instrument_discrete_performance.one_year_start_date!== null?dateFnc(props.stockInfo[0].instrument_discrete_performance.one_year_start_date):'-':'-'}</CenterTable>,
      dataIndex: 'date4',
      filterMultiple: false,
      width: '15%',
      onFilter: (value, record) => record.change.indexOf(value) === 0,
      sorter: (a, b) => a.change - b.change,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: <CenterTable>{props.stockInfo[0].instrument_discrete_performance !== null?props.stockInfo[0].instrument_discrete_performance.one_year_start_date!== null?dateFnc(props.stockInfo[0].instrument_discrete_performance.one_year_start_date):'-':'-'}<br/>to<br/>{props.stockInfo[0].instrument_discrete_performance !== null?props.stockInfo[0].instrument_discrete_performance.one_year_start_date!== null?dateFnc(props.stockInfo[0].instrument_discrete_performance.one_year_start_date):'-':'-'}</CenterTable>,
      dataIndex: 'date5',
      filterMultiple: false,
      width: '15%',
      onFilter: (value, record) => record.change.indexOf(value) === 0,
      sorter: (a, b) => a.change - b.change,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: '',
      dataIndex: 'button',
      width: '20%',
    },
  ];
  let vals = '';
  if(props.stockInfo.length > 0){
    props.stockInfo.map((x,index)=>(
      // x.instrument_details.bid_price !== null && x.instrument_details.ask_price !== null && x.instrument_details.day_change!==null?
      lisData.push(
          {
            key: index,
            name: x.name,
            date5: x.instrument_discrete_performance !== null?x.instrument_discrete_performance.one_year_value!== null?x.instrument_discrete_performance.one_year_value > 0?<StyledUp>+{applyAmountCommaMask(x.instrument_discrete_performance.one_year_value)}</StyledUp>:<StyledDown>{applyAmountCommaMask(x.instrument_discrete_performance.one_year_value)}</StyledDown>:'-':'-',
            date4: x.instrument_discrete_performance !== null?x.instrument_discrete_performance.two_year_value!== null?x.instrument_discrete_performance.two_year_value > 0?<StyledUp>+{applyAmountCommaMask(x.instrument_discrete_performance.two_year_value)}</StyledUp>:<StyledDown>{applyAmountCommaMask(x.instrument_discrete_performance.two_year_value)}</StyledDown>:'-':'-',
            date3: x.instrument_discrete_performance !== null?x.instrument_discrete_performance.three_year_value!==null?x.instrument_discrete_performance.three_year_value > 0?<StyledUp>+{applyAmountCommaMask(x.instrument_discrete_performance.three_year_value)}</StyledUp>:<StyledDown>{applyAmountCommaMask(x.instrument_discrete_performance.three_year_value)}</StyledDown>:'-':'-',
            date2: x.instrument_discrete_performance !== null?x.instrument_discrete_performance.four_year_value!==null?x.instrument_discrete_performance.four_year_value > 0?<StyledUp>+{applyAmountCommaMask(x.instrument_discrete_performance.four_year_value)}</StyledUp>:<StyledDown>{applyAmountCommaMask(x.instrument_discrete_performance.four_year_value)}</StyledDown>:'-':'-',
            date1: x.instrument_discrete_performance !== null?x.instrument_discrete_performance.five_year_value!==null?x.instrument_discrete_performance.five_year_value > 0?<StyledUp>+{applyAmountCommaMask(x.instrument_discrete_performance.five_year_value)}</StyledUp>:<StyledDown>{applyAmountCommaMask(x.instrument_discrete_performance.five_year_value)}</StyledDown>:'-':'-',
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