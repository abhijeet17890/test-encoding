import React from "react";
import "antd/dist/antd.css";
import { Select, Option } from "../../../../../sharedComponents/Select";
import { StyledInput, Styleddatepicker, StyledButton } from "./style";
import { Checkbox } from "../../../../../sharedComponents/Checkbox";

function Input(props) {
  return (
    <StyledInput>
      {props.heading ? <p>{props.heading}</p> : null}
      {props.select ? (
        <Select
          //   defaultValue={props.default ? props.data[0] : null}
          onChange={props.onChange}
          placeholder={props.placeholder}
          allowClear
        >
          {props.data
            ? props.data.map((x) => <Option value={x.data}>{x.data}</Option>)
            : null}
        </Select>
      ) : null}
        {props.datapicker ? <Styleddatepicker onChange={props.onChange} format={props.format}/> : null}
      {props.button ? (
        <StyledButton
          customcornertype="round-corner"
          type={props.type}
          onClick={props.onClick}
        >
          {props.content}
        </StyledButton>
      ) : null}
      {props.checkbox ? (
        <Checkbox onChange={props.onClick}>{props.content}</Checkbox>
      ) : null}
    </StyledInput>
  );
}

export default Input;
