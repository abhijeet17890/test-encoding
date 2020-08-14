import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Select,Option } from '../../../../sharedComponents/Select';
import {StyledInput, Styleddatepicker, StyledButton} from './style';
import { Checkbox } from '../../../../sharedComponents/Checkbox';


function Input(props) {

  return (
      <StyledInput>
         {props.heading?<p>{props.heading}</p>:null}
         {props.select?<Select defaultValue={props.default?props.data[0]:null} onChange={props.onChange}>
            {props.data?props.data.map((x)=>(
               <Option value={x}>{x}</Option>
            )):null}
         </Select>:null}
         {props.datapicker?<Styleddatepicker onChange={props.onChange}/>:null}
         {props.button?<StyledButton customcornertype='round-corner' type={props.type} onClick={props.onClik}>{props.content}</StyledButton>:null}
            {props.checkbox?<Checkbox onChange={props.onClik}>{props.content}</Checkbox>:null}
      </StyledInput>
  )
}

export default Input;
