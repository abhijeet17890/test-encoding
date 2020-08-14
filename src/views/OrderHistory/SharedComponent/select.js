import React, { useState } from "react";
// import { BlueArrowImage } from "../selectComponent/style";
// import BlueDownArrow from "../../../../assets/blueDownArrow.png";
import { Select, Option } from "../../../sharedComponents/Select";
import { StyledFormItem } from "./style";
// import {formateName} from "../dataManipulation";

function optionTemplate(props) {
  let option = [];
  if (props.data) {
    props.data.map((value, index) => {
      option.push(
        <Option key={index + 1} value={value.data}>
          {value.data}
        </Option>
      );
    });
  }

  return option;
}

function SelectComponent(props) {
  return (
    <StyledFormItem
      name={props.name}
      label={props.label}
      rules={props.rules}
      className={props.className}
    >
      <Select
        placeholder={props.placeholder}
        showSearch
        onChange={props.onChange}
        dropdownClassName="order_historydropdown"
        onSearch={props.onSearch}
        onSelect={props.onSelect}
        disabled={props.disabled}
        notFoundContent={props.notFoundContent}
        allowClear
      >
        {optionTemplate(props)}
      </Select>
    </StyledFormItem>
  );
}

export default SelectComponent;
