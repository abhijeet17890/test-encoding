import React from "react";
import { Row, Col } from "antd";

import { Input } from "../../../../sharedComponents/Input";

import { StyledFormItem, StyledRightCol } from "../../sharedComponents/style";
import { SwitchTitle } from "../../sharedComponents/switchComponent/style";

const TradedCompany = () => {
  return (
    <React.Fragment>
      <SwitchTitle className="space">
        Please list the company name and ticker symbol.
      </SwitchTitle>
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="&nbsp;"
            name="control_person_company_name"
            className="no-label"
            rules={[
              {
                required: true,
                message: "Please enter the company's name",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Enter the company's name" />
          </StyledFormItem>
        </Col>
        <StyledRightCol xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="&nbsp;"
            name="company_tricker_symbol"
            className="no-label"
            rules={[
              {
                required: true,
                message: "Please enter the company's ticker symbol",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Enter the company's ticker symbol" />
          </StyledFormItem>
        </StyledRightCol>
      </Row>
    </React.Fragment>
  );
};

export default TradedCompany;
