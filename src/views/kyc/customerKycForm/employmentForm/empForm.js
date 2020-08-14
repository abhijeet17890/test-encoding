import React, { useEffect } from "react";
import { Row, Col } from "antd";

import { Input } from "../../../../sharedComponents/Input";
import Divider from "../../../../sharedComponents/Divider";

import SelectComponent from "../../sharedComponents/selectComponent";
import SwitchComponent from "../../sharedComponents/switchComponent";

import OfficialInfo from "./officialInfo";
import TradedCompany from "./tradedCompany";
import Affiliated from "./affiliated";

import { StyledFormItem, StyledRightCol } from "../../sharedComponents/style";
import { StyledRow } from "./style";

const EmpForm = ({
  empDetailsData,
  employeeStatusChangedHandler,
  isEmployed,
  industry,
  position,
  officialInfoChangedHandler,
  isOfficialInfoSwitch,
  officialInfo,
  affiliatedChangedHandler,
  isAffiliatedSwitch,
  affiliated,
  tradedCompanyChangedHandler,
  isTradedCompanySwitch,
  tradedCompany,
  form,
  initialValues,
  employeeStatus,
}) => {
  useEffect(() => {
    if (empDetailsData) {
      form.setFieldsValue({
        emp_status:
          empDetailsData.emp_status !== undefined
            ? empDetailsData.emp_status.name
            : initialValues["emp_status"],
        is_finra: empDetailsData.is_finra,
        is_control_person: empDetailsData.is_control_person,
        is_political_public: empDetailsData.is_political_public,
        industry:
          empDetailsData.industry !== undefined
            ? empDetailsData.industry.name
            : null,
        emp_type:
          empDetailsData.emp_type !== undefined
            ? empDetailsData.emp_type.name
            : null,
        company_name: empDetailsData.company_name,
        political_public_member: empDetailsData.political_public_member,
        company_tricker_symbol: empDetailsData.company_tricker_symbol,
        control_person_company_name: empDetailsData.control_person_company_name,
      });
    }
  }, []);

  return (
    <React.Fragment>
      <Row justify="center">
        <Col xs={{ span: 24 }} sm={{span:11}} lg={{ span: 11 }}>
          <SelectComponent
            placeholder="Select from option"
            list={employeeStatus}
            name="emp_status"
            label="Employment Status"
            changedHandler={employeeStatusChangedHandler}
            isJsonObject={true}
            rules={[
              {
                required: true,
                message: "Please select employment status",
                whitespace: true,
              },
            ]}
          />
        </Col>
        {isEmployed ? (
          <StyledRightCol xs={{ span: 24 }}  sm={{span:11}} lg={{ span: 11 }}>
            <StyledFormItem
              label="Company name"
              name="company_name"
              rules={[
                {
                  required: true,
                  message: "Please enter your company name",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Enter your company name" />
            </StyledFormItem>
          </StyledRightCol>
        ) : (
          <StyledRightCol xs={{ span: 24 }} sm={{span:11}} lg={{ span: 11 }}></StyledRightCol>
        )}
      </Row>
      {isEmployed ? (
        <Row justify="center">
          <Col xs={{ span: 24 }}  sm={{span:11}} lg={{ span: 11 }}>
            <SelectComponent
              name="industry"
              label="Industry"
              placeholder="Select from option"
              list={industry}
              isJsonObject={true}
              rules={[
                {
                  required: true,
                  message: "Please select industry",
                },
              ]}
            />
          </Col>
          <StyledRightCol xs={{ span: 24 }} sm={{span:11}} lg={{ span: 11 }}>
            <SelectComponent
              name="emp_type"
              label="Position"
              className="no-margin-bottom"
              placeholder="Select from option"
              list={position}
              isJsonObject={true}
              rules={[
                {
                  required: true,
                  message: "Please select position",
                },
              ]}
            />
          </StyledRightCol>
        </Row>
      ) : null}
      <Divider />
      <StyledRow justify="center">
        <Col xs={{ span: 23, offset: 0 }} lg={{ span: 22 }}>
          <SwitchComponent
            title="Are you a current or former Politically Exposed Person or Public Official? (A politically exposed person is someone who has
              been entrusted with a prominent public function, or who is closely related to such a person.)"
            changedHandler={officialInfoChangedHandler}
            checked={isOfficialInfoSwitch}
          />
          {officialInfo === true ? <OfficialInfo /> : null}
        </Col>
      </StyledRow>
      <Divider />
      <StyledRow justify="center">
        <Col xs={{ span: 23, offset: 0 }} lg={{ span: 22 }}>
          <SwitchComponent
            title="Are you affiliated with or employed by a stock exchange, member firm of an exchange or FINRA, or a municipal securities
            broker-dealer?"
            changedHandler={affiliatedChangedHandler}
            checked={isAffiliatedSwitch}
          />
          {affiliated === true ? <Affiliated /> : null}
        </Col>
      </StyledRow>
      <Divider />
      <StyledRow justify="center">
        <Col xs={{ span: 23, offset: 0 }} lg={{ span: 22 }}>
          <SwitchComponent
            title="Are you a control person (a Director, Officer or 10% stock owner) of a publicly traded company?"
            changedHandler={tradedCompanyChangedHandler}
            checked={isTradedCompanySwitch}
          />

          {tradedCompany === true ? <TradedCompany /> : null}
        </Col>
      </StyledRow>
    </React.Fragment>
  );
};

export default EmpForm;
