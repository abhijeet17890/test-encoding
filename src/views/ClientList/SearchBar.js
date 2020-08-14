import React, { useState } from "react";
import { Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import { StockSearch, StockLink } from "./Style";
import "antd/dist/antd.css";
import { routes } from "../../constants/routes";
import { capitaliseFirstChar } from "../../utils/dataManipulation";
const renderItem = (pre_title, title, id, link) => ({
  value: title,
  name: pre_title,
  id: id,
  label: (
    <StockLink>
      <span>{title}</span>
    </StockLink>
  ),
});

const SearchBar = (props) => {
  const history = useHistory();
  let optionsVar = [];
  // let options = [];
  const type = (val) => {
    props.ontype(val);
  };
  if (props.data) {
    if (props.name === "client") {
      props.data.map((x,index) =>
        // console.log(x.symbol,x.name,x.instrument_details.url),
        optionsVar.push(
          renderItem(
            "client",     
            capitaliseFirstChar(x.client_details.first_name),
            // + "" + capitaliseFirstChar(x.client_details.last_name),
            routes.authRoutes.productDetails + "/" + x.id
          )
        )
      );
    } else if (props.name === "rm") {
      props.data.map((x) =>
        // console.log(x.symbol,x.name,x.instrument_details.url),
        optionsVar.push(
          renderItem(
            "rm",
            `${
              x.personal_details.first_name +
              (x.personal_details.last_name !== null
                ? x.personal_details.last_name
                : "")
            }`,
            x.id
            // x.relationship_managers[0].relationship_manager
            //   .relationship_manager_detail.first_name,
            //   routes.authRoutes.productDetails + "/" + x.id
          )
        )
      );
    }

    // if (optionsVar.length > 0) {
    //   options = [
    //     {
    //       options: optionsVar,
    //     },
    //   ];
    // }
  }

  const onSelect = (value, name) => {
    if (name.name === "client") {
      props.handleState(value, name);
    } else if (name.name === "rm") {
      props.handleState(name.id, name);
    }
  };

  return (
    <>
      <StockSearch
        dropdownClassName="search_dropdown"
        options={optionsVar}
        onSelect={onSelect}
      >
        <Input
          // .Search
          // onFocus={(e) => type(e.target.value)}
          onChange={(e) => type(e.target.value)}
          enterButton
          placeholder={props.placeholder}
          allowClear
        />
      </StockSearch>
    </>
  );
};

export default SearchBar;
