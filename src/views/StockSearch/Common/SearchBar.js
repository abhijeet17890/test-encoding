import React from 'react';
import { Input } from 'antd';
import {useHistory} from "react-router-dom";
import {StockSearch, StockLink} from '../Style';
import 'antd/dist/antd.css'
import {routes} from "../../../constants/routes";


const renderItem = (pre_title,title,link) => ({
   value: title,
   label: (
     <StockLink>
       <span>{pre_title}</span>
       <span >|</span>
       <span ><a href={link} target="_blank" >{title}</a></span>
     </StockLink>
   ),
 });

const SearchBar = (props) => {
    const history = useHistory();
    let optionsVar = [];
    let options = [];
    const type = (val) => {
      props.ontype(val)
    }
    if(props.data){
        props.data.map((x)=>(
          // console.log(x.symbol,x.name,x.instrument_details.url)
          optionsVar.push(renderItem(x.symbol,x.name,routes.authRoutes.productDetails+'/'+x.id))
        ))
        if(optionsVar.length>0){
          options = [
            {
              options: optionsVar,
            }
          ];
        }
    }
    // console.log(props.preSearch)
   return (
     <>
      <StockSearch
         dropdownClassName="search_dropdown"
         options={options}
         defaultValue={props.preSearch}
      >
         <Input.Search onFocus={e => type(e.target.value)} onChange={e => type(e.target.value)} enterButton placeholder="Enter Instrument name" />
      </StockSearch>
      </>
   )
 }
 
 export default SearchBar;