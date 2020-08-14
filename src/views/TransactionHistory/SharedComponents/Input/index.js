import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Select,Option } from '../../../../sharedComponents/Select';
import {StyledInput, Styleddatepicker, StyledButton} from './style';
import { Checkbox } from '../../../../sharedComponents/Checkbox';
import moment from 'moment';
const dateFormat = "DD/MM/YYYY";

function Input(props) {

  return (
      <StyledInput>
         {props.heading?<p>{props.heading}</p>:null}
        {props.select ? <Select defaultValue={props.defaultValue} onChange={props.onChange}>
           {/* {console.log("val",props.defaultValue)} */}
           {/* {console.log("val",props.val,"props.",props.data)}{props.val ? props.data[0] : null} */}
            {props.data?props.data.map((x)=>(
               <Option value={x}>{x}</Option>
            )):null}
         </Select>:null}
        {props.datapicker ? <Styleddatepicker defaultValue={moment(props.value)} format= {dateFormat}
      //   format={dateFormat}
           onChange={props.onChange} /> : null}
         {props.button?<StyledButton customcornertype='round-corner' type={props.type} onClick={props.onClick}>{props.content}</StyledButton>:null}
        {props.checkbox ? <Checkbox onChange={() => props.onClick(props.content)} >{props.content}</Checkbox>:null}
        {/* {props.checkbox ? <Checkbox onChange={ props.onClick} >{props.content}</Checkbox>:null} */}

      </StyledInput>
  )
}

export default Input;
