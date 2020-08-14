import React, { useState } from 'react';
import {Stock, GlobalCss} from '../Style';
import 'antd/dist/antd.css';
import StockResults from './StockResults';
import StockPageTitle from './StockPageTitle';
import SearchContainer from './SearchContainer';


function StockSearchContainer(props) {
  const [stockData, setstockData] = useState([]);
  const [stockSearch, setstockSearch] = useState('');

  const stockResult = (data,search)=> {
    setstockData(data);
    setstockSearch(search);
  }

  return (
    <>
    <GlobalCss />
    <Stock>
        {/*header and switch part starts here */}
        <StockPageTitle val={props.match.params.val}/>
        <SearchContainer val={props.match.params.val} stockData={(data,search)=>stockResult(data,search)} prefixData={props.history.location.state} resultPage={true}/>
        {/*header and switch part ends here */}

        <StockResults val={props.match.params.val} stockInfo={stockData} stockSearch={stockSearch}/>
    </Stock>
    </>
  )
}

export default StockSearchContainer;
