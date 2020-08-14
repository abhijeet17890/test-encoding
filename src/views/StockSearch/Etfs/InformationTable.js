import React from 'react';
import { StockTable } from '../Style';
import 'antd/dist/antd.css';
import ButtonWrape from '../Common/const';

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
     title: 'Fund Size',
     dataIndex: 'fund',
     width: '15%',
     sortDirections: ['descend', 'ascend'],
     sorter: (a, b) => a.buy - b.buy,
   },
   {
     title: 'Net Initial Charge',
     dataIndex: 'Initial',
     width: '15%',
     sortDirections: ['descend', 'ascend'],
     sorter: (a, b) => a.sell - b.sell,
   },
   {
     title: 'Net Ongoing Charge',
     dataIndex: 'Ongoing',
     width: '15%',
     sortDirections: ['descend', 'ascend'],
     sorter: (a, b) => a.sell - b.sell,
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
     fund: 32,
     Initial: 42,
     Ongoing: 32,
     button: <ButtonWrape />
   },
   {
     key: '2',
     name: 'AAPL | Apple',
     fund: 32,
     Initial: 42,
     Ongoing: 32,
     button: <ButtonWrape />
   },
   {
     key: '3',
     name: 'AAPL | Apple',
     fund: 32,
     Initial: 42,
     Ongoing: 32,
     button: <ButtonWrape />
   },
   {
     key: '4',
     name: 'AAPL | Apple',
     fund: 32,
     Initial: 42,
     Ongoing: 32,
     button: <ButtonWrape />
   },
 ];

 function onChange(pagination, filters, sorter, extra) {
   console.log('params', pagination, filters, sorter, extra);
 }

const CommonTable = (props) => {
   return (
      <StockTable columns={columns} dataSource={data} onChange={onChange} />
   )
 }
 
 export default CommonTable;