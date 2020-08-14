import React, { useEffect } from "react";
import { Row, Col } from "antd";

import SelectComponent from "../../sharedComponents/selectComponent/index";
import { StyledRightCol } from "../../sharedComponents/style";
import { AmlStyledComponent } from "./style";

const Aml = ({
  transactionFrequency,
  fundSource,
  globaliseDeposit,
  investmentHistory,
  form,
  investmentProfileData,
}) => {
  useEffect(() => {
    if (investmentProfileData) {
      form.setFieldsValue({
        transcation_count: investmentProfileData.transcation_count.name,
        fund_source: investmentProfileData.fund_source.name,
        expect_dep_amt: investmentProfileData.expect_dep_amt.name,
        past_trade_count: investmentProfileData.past_trade_count.name,
      });
    }
  }, []);
  return (
    <AmlStyledComponent>
      <Row justify="center">
        <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
          <SelectComponent
            placeholder="Select from option"
            name="transcation_count"
            label="How many deposits and withdrawals do you plan to make
                   over the next 12 months?"
            list={transactionFrequency}
            rules={[
              {
                required: true,
                message: `Please select transaction frequency`,
              },
            ]}
            isJsonObject={true}
          />
        </Col>
        <StyledRightCol xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
          <SelectComponent
            placeholder="Select from option"
            className="fund-source-investment"
            list={fundSource}
            name="fund_source"
            label="Funding Source of Investment"
            isJsonObject={true}
            rules={[
              {
                required: true,
                message: "Please select fund source",
              },
            ]}
          />
        </StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
          <SelectComponent
            placeholder="Select from option"
            name="expect_dep_amt"
            label="Approximately how much money do you expect to deposit
                  in your Globalise account over the next 12 months?  "
            list={globaliseDeposit}
            rules={[
              {
                required: true,
                message: `Please select globalise deposit`,
              },
            ]}
            isJsonObject={true}
          />
        </Col>
        <StyledRightCol xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
          <SelectComponent
            placeholder="Select from option"
            name="past_trade_count"
            className="past-trade-count"
            label="Approximately how many trades have you made over the last
                  12 months?"
            list={investmentHistory}
            rules={[
              {
                required: true,
                message: `Please select investment history`,
              },
            ]}
            isJsonObject={true}
          />
        </StyledRightCol>
      </Row>
    </AmlStyledComponent>
  );
};

export default Aml;
