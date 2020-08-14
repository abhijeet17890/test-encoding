import React, { useState}from 'react';
import { StyledTable } from './styles';
import { Button } from '../../../sharedComponents/button';
import EditNote from './EditNote';
import DeleteNote from './DeleteNote';
import {Space} from 'antd';


const NotesTable = (props) => {
  const[delVisible, setDelVisible] = useState(false);
  const openDel=()=>{
    setDelVisible(true);
  }
  const closeDel = () =>{
    setDelVisible(false);
  }

  const columns = [
     {
       title: 'Note',
       dataIndex: 'note',
       filterMultiple: false,
       width: '30%',
     },
     {
      title: 'Last Update',
      dataIndex: 'lastUpdate',
      filterMultiple: false,
      width: '30%',
    },
    {
      title:'',
      dataIndex:'action',
      width:'30%'
    },
   ];
   
   const data = [
     {
       key: '1',
       note: 'Note 1',
       lastUpdate: '05/04/2020 ',
       action: <Space direction='horizontal' size={10}>
          <Button size={'sm-1'} outlined>Edit</Button>
          <Button size={'sm-1'}>Delete</Button>
        </Space>,
       
     },
     {
      key: '2',
      note: 'Note 1',
       lastUpdate: '05/04/2020 ',
       action: <Space direction='horizontal' size={10}>
          <Button size={'sm-1'} outlined>Edit</Button>
          <Button size={'sm-1'}>Delete</Button>
        </Space>,
    },
    {
      key: '3',
      note: 'Note 1',
       lastUpdate: '05/04/2020 ',
       action: <Space direction='horizontal' size={10}>
          <Button size={'sm-1'} outlined>Edit</Button>
          <Button size={'sm-1'}>Delete</Button>
        </Space>,
    },
    {
      key: '4',
      note: 'Note 1',
       lastUpdate: '05/04/2020 ',
       action: <Space direction='horizontal' size={10}>
          <Button size={'sm-1'} outlined>Edit</Button>
          <Button size={'sm-1'}>Delete</Button>
        </Space>,
    },
    {
      key: '5',
      note: 'Note 1',
       lastUpdate: '05/04/2020 ',
       action: <Space direction='horizontal' size={10}>
          <Button size={'sm-1'} outlined  onClick={props.editNote}>Edit</Button>
          <Button size={'sm-1'} onClick={openDel}>Delete</Button>
        </Space>,
    },
   ];
  
 

   return (
     <div>
      <StyledTable columns={columns} dataSource={data} />
      <DeleteNote visible={delVisible} closeDel={closeDel}/>
    </div>
   )
 }
 
 export default NotesTable;