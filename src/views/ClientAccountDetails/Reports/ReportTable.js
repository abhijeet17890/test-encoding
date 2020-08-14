import React from 'react';
import { StyledTable } from './styles';
import { Button } from '../../../sharedComponents/button';

const columns = [
   {
     title: 'Statement',
     dataIndex: 'date',
     filterMultiple: false,
     width: '90%',
   },
  {
    title:'',
    dataIndex:'view',
    width:'10%'
  },
 ];
 
 const data = [
   {
     key: '1',
     date: '31 Jan 2020 Statement ',
     view: <Button size={'sm-1'}>View</Button>,
     
   },
   {
    key: '2',
    date: '31 Feb 2020 Statement ',
    view: <Button size={'sm-1'}>View</Button>,
    
  },
  {
    key: '3',
    date: '31 Dec 2019 Statement ',
    view: <Button size={'sm-1'}>View</Button>,
    
  },
  {
    key: '4',
    date: '31 Nov 2019 Statement ',
    view: <Button size={'sm-1'}>View</Button>,
    
  },
  {
    key: '5',
    date: '31 Jan 2019 Statement ',
    view: <Button size={'sm-1'}>View</Button>,
    
  },
 ];

const ReportTable = (props) => {
   return (
      <StyledTable columns={columns} dataSource={data} />
   )
 }
 
 export default ReportTable;