import React, {useState,useEffect,useRef } from "react";
import { Row,Form, Divider} from "antd";
import {StyledCol, StyledRightDiv, StyledSelect} from "../style";
import {Option} from '../../../sharedComponents/Select/index';
import {Input} from '../../../sharedComponents/Input'
import "antd/dist/antd.css";

const SelectAccount = (props) => {
   const [counter, setCounter] = useState(0);

   useEffect(() => {
      if(props.change){
         props.change(props.data?props.data[0].val:null);
      }
   }, [counter]);
  return (
   <>
      <Row>
         <StyledCol xs={14} sm={14} md={12} lg={12} xl={12}>
            {props.title}
         </StyledCol>
         <StyledCol xs={10} sm={10} md={12} lg={12} xl={12} justify>
            {props.select?<Form.Item name={props.keys} rules={[{ required: true, message:'This field is required'}]} ><StyledSelect 
                                 placeholder={props.placeholder}
                                 onFocus={props.focus}
                                 onBlur={props.blur}
                                 onSearch={props.search} 
                                 // defaultValue={props.data && props.default?props.data[0].val:null} 
                                 onChange={(val)=>props.change?props.change(val,props.keys):null}>
               {props.data?props.data.map((x,index)=>(
                  <Option key={index} value={x.val}>{x.text}</Option>
               )):null}
            </StyledSelect></Form.Item>:null}
            {props.text?<StyledRightDiv>{props.text}</StyledRightDiv>:null}
            {props.input?<Form.Item name={props.keys} rules={[
               { required: true, message:'This field is required'},
               ({ getFieldValue }) => ({
                  validator(rule, value) {
                     if(props.validation !== undefined){
                        if(props.validation[props.keys] !==null){
                           if (props.validation[props.keys].max_value !== undefined || props.validation[props.keys].max_value !== null?(props.validation[props.keys].total?value * getFieldValue(props.keys ==='amount'?'order_price':'amount'):value) > props.validation[props.keys].max_value:false) {
                              return Promise.reject(props.validation[props.keys].errors); 
                           }
                           if (props.validation[props.keys].min_value !== undefined || props.validation[props.keys].min_value !== null?value < props.validation[props.keys].min_value:false) {
                              return Promise.reject(props.validation[props.keys].errors); 
                           }
                           return Promise.resolve();  
                        }
                        return Promise.resolve();   
                     } 
                     return Promise.resolve();  
                  },
                }),
               ]} ><Input type='number' step={props.checked?'0.00000001':'0.01'} min={props.checked?'0.00000001':'0.01'} disabled={props.disable} onChange={(x)=>props.type(x.target.value, props.keys)} placeholder={props.placeholder}/></Form.Item>:null}
         </StyledCol>
      </Row>

   </>
  );
               }

export default SelectAccount;
