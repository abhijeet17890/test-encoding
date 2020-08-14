import React, { useState } from "react";

import { Select, Option } from "../../../../sharedComponents/Select";

import { BlueArrowImage } from "../selectComponent/style";
import { StyledFormItem } from ".././style";

import BlueDownArrow from "../../../../assets/blueDownArrow.png";

const optionTemplate = (props) => {
  let option = [];
  if (props.list) {
    props.list.map((accountSummary) => {
      accountSummary.map((value) => {
        const accountDetails = value.accountSummary;
        if (accountDetails) {
          const name =
            accountDetails.details.nick_name +
            " / " +
            accountDetails.details.dw_account_number;
          option.push(
            <Option
              key={accountDetails.accountID}
              value={name}
              cashAvailableForWithdrawals={
                accountDetails.cash.cashAvailableForWithdrawal
              }
            >
              {name}
            </Option>
          );
        }
      });
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
