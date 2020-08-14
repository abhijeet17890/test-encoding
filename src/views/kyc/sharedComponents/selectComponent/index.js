import React, { useState } from "react";

import { formateName } from "../../../../utils/dataManipulation";

import { Select, Option } from "../../../../sharedComponents/Select";

import { BlueArrowImage } from "../selectComponent/style";
import { StyledFormItem } from ".././style";

import BlueDownArrow from "../../../../assets/blueDownArrow.png";

const optionTemplate = (props) => {
  let option = [];
  if (props.list) {
    props.list.map((value, index) => {
      if (props.isDay) {
        option.push(
          <Option key={index + 1} value={index + 1}>
            {index + 1}
          </Option>
        );
      } else if (props.isYear) {
        option.push(
          <Option
            key={props.currentYear - index}
            value={props.currentYear - index}
          >
            {props.currentYear - index}
          </Option>
        );
      } else if (props.isMonth) {
        option.push(
          <Option key={value.name} value={value.name}>
            {value.name}
          </Option>
        );
      } else if (props.isCountry || props.isJsonObject) {
        option.push(
          <Option key={value.id} value={value.name} data-active={value.active}>
            {value.name}
          </Option>
        );
      } else if (props.isRiskTolerance) {
        option.push(
          <Option key={index} value={value.name} label={value.name}>
            <p className="risk-title">{value.name}</p>
            <p>{value.description}</p>
          </Option>
        );
      } else if (props.isStateCity) {
        option.push(
          <Option key={index} value={value.name_std}>
            {value.name_std}
          </Option>
        );
      } else if (props.isPincode) {
        option.push(
          <Option
            key={value.id}
            value={value.code}
            district_name={value.district_name}
            region_name={value.region_name}
            city={value.city}
            id={value.id}
            name={value.name}
            region={value.region}
          >
            {value.code}
          </Option>
        );
      } else if (props.isAdvisorType) {
        option.push(
          <Option
            key={value.id}
            value={formateName(value.name)}
            description={value.description}
            name={value.name}
          >
            {formateName(value.name)}
          </Option>
        );
      } else {
        option.push(
          <Option key={value} value={value}>
            {value}
          </Option>
        );
      }
    });
  }

  return option;
};

function SelectComponent(props) {
  const [arrowImage, setArrowImage] = useState(BlueDownArrow);
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
        onChange={props.changedHandler}
        suffixIcon={
          arrowImage ? (
            <BlueArrowImage src={arrowImage} alt=""></BlueArrowImage>
          ) : null
        }
        onDropdownVisibleChange={(open) =>
          open === true ? setArrowImage() : setArrowImage(BlueDownArrow)
        }
        dropdownClassName="kyc-dropdown"
        optionLabelProp="label"
        onSearch={props.onSearch}
        onSelect={props.onSelect}
        disabled={props.disabled}
        notFoundContent={props.notFoundContent}
      >
        {optionTemplate(props)}
      </Select>
    </StyledFormItem>
  );
}

export default SelectComponent;
