import React from 'react';
import {Stock, GlobalCss, StyledGapDivider} from './Style';
import 'antd/dist/antd.css';
import AllResult from './Common/AllResult';
import StockPageTitle from './Common/StockPageTitle';
import SearchContainer from './Common/SearchContainer'

function StockSearch(props) {


  return (
    <>
    <GlobalCss />
    <Stock>
        {/*header and switch part starts here */}
        <StockPageTitle val={props.match.params.val} />
        <StyledGapDivider orientation="left"/>
        <SearchContainer val={props.match.params.val}/>
        {/*header and switch part ends here */}

        <AllResult val={props.match.params.val}/>
    </Stock>
    </>
  //  <div className="stock_search_container">
  //    {/*header and switch part starts here */}
  //     <StockPageTitle />
  //     <SearchContainer />
  //     {/*header and switch part ends here */}
  //     <AllResult />
  //  </div>
  )
}

export default StockSearch;
