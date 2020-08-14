import React from 'react';
import {StockSelect} from '../Style';
import 'antd/dist/antd.css'
import {Option} from '../../../sharedComponents/Select/index';
import {changePascalCase} from '../../../utils/dataManipulation';

const SelectJs = (props) => {

  const onChange = (val)=> {
    props.onSelect(val)
   }
   return (
             <StockSelect
               showSearch
               // className={props.class}
               placeholder="Select by Sector"
               defaultValue={props.defaultVal?props.defaultVal:''}
               optionFilterProp="children"
               onChange={onChange}
               filterOption={(input, option) =>
                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
               } 
               loading={props.data?false:true}
               >
              <Option value={''}>{changePascalCase('All')}</Option>
              {props.data?props.data.map((x,index)=>(
                <Option key={index+1} value={x.id}>{changePascalCase(x.name)}</Option>
              )):null}
             </StockSelect>

   )
 }
 
 export default SelectJs;