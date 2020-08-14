import React, { useEffect } from "react";
import { Row, Col } from "antd";

import SelectComponent from "../../sharedComponents/selectComponent/index";
import { StyledRightCol } from "../../sharedComponents/style";

const InvestmentProfile = ({
  annualIncome,
  liquidNetWorth,
  totalNetWorth,
  form,
  investmentProfileData,
  investmentExperience,
  planTotrade,
  getDropdownName,
}) => {
  useEffect(() => {
    if (investmentProfileData) {
      form.setFieldsValue({
        often_plan_trade: getDropdownName(
          planTotrade,
          investmentProfileData.often_plan_trade
        ),
        annual_income: investmentProfileData.annual_income.name,
        liquid_net_worth: investmentProfileData.liquid_net_worth.name,
        total_net_worth: investmentProfileData.total_net_worth.name,
        invest_exp_year: getDropdownName(
          investmentExperience,
          investmentProfileData.invest_exp_year
        ),
      });
    }
  }, []);

  return (
    <React.Fragment>
      <Row justify="center">
        <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
          <SelectComponent
            placeholder="Select from option"
            name="often_plan_trade"
            label="How often do you plan to trade?"
            list={planTotrade}
            isJsonObject={true}
            rules={[
              {
                required: true,
                message: "Please select an option",
              },
            ]}
          />
        </Col>
        <StyledRightCol xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
          <SelectComponent
            placeholder="Select from option"
            list={investmentExperience}
            name="invest_exp_year"
            label="Investment experience"
            isJsonObject={true}
            rules={[
              {
                required: true,
                message: "Please select investment experience",
              },
            ]}
          />
        </StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
          <SelectComponent
            placeholder="Select from option"
            name="annual_income"
            label="Annual Income"
            rules={[
              {
                required: true,
                message: "Please select annual income",
              },
            ]}
            list={annualIncome}
            isJsonObject={true}
          />
        </Col>
        <StyledRightCol xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
          <SelectComponent
            placeholder="Select from option"
            name="liquid_net_worth"
            label="Liquid Net Worth "
            list={liquidNetWorth}
            isJsonObject={true}
            rules={[
              {
                required: true,
                message: "Please select liquid net worth",
              },
            ]}
          />
        </StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
          <SelectComponent
            placeholder="Select from option"
            list={totalNetWorth}
            name="total_net_worth"
            label="Total Net Worth"
            isJsonObject={true}
            rules={[
              {
                required: true,
                message: "Please select total net worth",
              },
            ]}
          />
        </Col>
        <StyledRightCol
          xs={{ span: 24 }}
          sm={{ span: 11 }}
          lg={{ span: 11 }}
        ></StyledRightCol>
      </Row>
    </React.Fragment>
  );
};

export default InvestmentProfile;
