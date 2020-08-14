import React from 'react';
import { Space} from 'antd';
import 'antd/dist/antd.css';
import { StockButton } from '../Style';
import {routes} from '../../../constants/routes';
import { useAuth } from "../../../contextProviders/authProvider";
import {useHistory} from "react-router-dom";

const ButtonWrape = (props) => {
   const history = useHistory();
   const { loggedInUser } = useAuth();
    const transitionInfo = loggedInUser && loggedInUser[`customer_transition_info`] ? loggedInUser[`customer_transition_info`] :''

   return (<Space size='large' align="end"><StockButton customcornertype='round-corner' outlined href={routes.authRoutes.productDetails+'/'+props.id}>View</StockButton><StockButton customcornertype='round-corner' outlined href='/'>+ Watchlist</StockButton><StockButton customcornertype='round-corner' 
   onClick={()=>{history.push({
      pathname: routes.authRoutes.invest,
      state: {
        symbol: props.symbol,
        name: props.name,
        id: props.id
      }
      })}}
      disabled={transitionInfo && transitionInfo['kyc_status'] ==='PENDING'?true:false}
   >Invest</StockButton></Space>)
}

export default ButtonWrape;