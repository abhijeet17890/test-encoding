import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import { routes } from "../../../../constants/routes";
import {
  StyledAutoComplete,
  SearchDropdown,
  SearchText,
  SearcPrefix,
} from "./style";
import { Input } from "../../../../sharedComponents/Input";
import { Row, Col } from "antd";

const SearchBar = (props) => {
  const history = useHistory();
  let optionsVar = [];
  const [value, setVal] = useState();
  const type = (val) => {
    setVal(val);
    props.ontype(val);
  };

  const renderItem = (title, id, link) => ({
    //  value: title,
    label: (
      <SearchDropdown
        onClick={() => {
          history.push({ pathname: link, state: id });
        }}
      >
        <SearcPrefix>|</SearcPrefix>
        <SearchText>{title}</SearchText>
      </SearchDropdown>
    ),
  });

  if (props.data) {
    props.data.map((x) =>
      optionsVar.push(
        renderItem(
          x.personal_details.first_name,
          x.id,
          routes.authRoutes.viewRM
        )
      )
    );
  }
  return (
    <>
      <StyledAutoComplete
        dropdownClassName="search_dropdown"
        options={optionsVar}
      >
        <Row>
          <Col span={24}>
            <Input
              onFocus={(e) => type(e.target.value)}
              onChange={(e) => type(e.target.value)}
              placeholder="Enter RM name"
            />
          </Col>
        </Row>
      </StyledAutoComplete>
    </>
  );
};

export default SearchBar;
