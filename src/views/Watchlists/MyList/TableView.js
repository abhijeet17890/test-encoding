import React from 'react';
import { Space} from 'antd';
import { Button } from '../../../sharedComponents/button/index';

import Up from '../../../assets/GreenUpArrow.png';
import Down from '../../../assets/redDownArrow.png';

import 'antd/dist/antd.css'
import * as S from './styles.js';

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
     title: 'Buy',
     dataIndex: 'buy',
     width: '10%',
     sortDirections: ['descend', 'ascend'],
     sorter: (a, b) => a.buy - b.buy,
   },
   {
     title: 'Sell',
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
     buy: '$ 266.51',
     sell: '$266.47',
     change:<Space size='large'>
       <img src={Up} alt={'arrow'}/>
       <S.Growth> +$0.43 (+0.16%)</S.Growth>
     </Space>,
     button: <Space size='small' align="end">
       <Button size={'sm-2'} outlined href='/'>View</Button>
       <Button size={'sm-2'} outlined href='/'>Remove</Button>
       <Button type="primary" size={'sm-2'} href='/'>Invest</Button></Space>
   }, //CORRECT THIS: HREF IS GETTING USED IN  BUTTON IS GETTING USED
   {
     key: '2',
     name: 'NFL | Netflix Inc',
     buy: '$370.52',
     sell: '$370.32',
     change:<Space size='large'>
       <img src={Down} alt={'arrow'}/>
       <S.Decrement> -$0.32 (-0.09%)</S.Decrement>
     </Space>,
     button: <Space size='small' align="end">
       <Button size={'sm-2'} outlined href='/'>View</Button>
       <Button size={'sm-2'} outlined href='/'>Remove</Button>
       <Button type="primary" size={'sm-2'} href='/'>Invest</Button></Space>
   },
   {
     key: '3',
     name: 'GOOG | Alphabet Inc Class C',
     buy: '$1,208.15',
     sell: '$1,206.80',
     change:<Space size='large'>
       <img src={Down} alt={'arrow'}/>
       <S.Decrement> -$1.91 (-0.16%)</S.Decrement>
     </Space>,
     button: <Space size='small' align="end">
       <Button size={'sm-2'} outlined href='/'>View</Button>
       <Button size={'sm-2'} outlined href='/'>Remove</Button>
       <Button type="primary" size={'sm-2'} href='/'>Invest</Button>
       </Space>
   },
   {
     key: '4',
     name: 'GS | Goldman Sachs Group Inc',
     buy: '$184.31',
     sell: '$184.31',
     change:<Space size='large'>
       <img src={Up} alt={'arrow'}/>
       <S.Growth> +$6.86 (+3.88%)</S.Growth>
     </Space>,
     button: <Space size='small' align="end">
       <Button size={'sm-2'} outlined href='/'>View</Button>
       <Button size={'sm-2'} outlined href='/'>Remove</Button>
       <Button type="primary" size={'sm-2'} href='/'>Invest</Button>
       </Space>
   },
   {
    key: '5',
    name: 'NKE | Nike Inc B',
    buy: '$86.93',
    sell: '$86.93',
    change:<Space size='large'>
      <img src={Up} alt={'arrow'}/>
      <S.Growth> +$1.34 (+1.57%)</S.Growth>
    </Space>,
    button: <Space size='small' align="end">
      <Button size={'sm-2'} outlined href='/'>View</Button>
      <Button size={'sm-2'} outlined href='/'>Remove</Button>
      <Button type="primary" size={'sm-2'} href='/'>Invest</Button>
      </Space>
  },
 ];

 function onChange(pagination, filters, sorter, extra) {
   console.log('params', pagination, filters, sorter, extra);
 }

function TableView () {
   return (
     <div className='my-list'>
      <S.StyledTable columns={columns} dataSource={data} onChange={onChange} />
    </div>
   )
 }
 
 export default TableView;