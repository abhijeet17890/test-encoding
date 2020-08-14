import React from 'react';
import { Space} from 'antd';
import { StockButton } from '../styles';
import 'antd/dist/antd.css'

const ButtonWrape = (props) => {
   return (<Space size='large' align="end"><StockButton customcornertype='round-corner' outlined href='/'>+ Funds</StockButton><StockButton customcornertype='round-corner' href='/'>View Portfolio</StockButton></Space>)
}

export default ButtonWrape;