import React, { useEffect } from "react";
import { Row, Col } from "antd";

import SelectComponent from "../../sharedComponents/selectComponent";
import { StyledRightCol } from "../../sharedComponents/style";

const RiskTolerance = ({
  form,
  investmentProfileData,
  riskTolerance,
  getDropdownName,
}) => {
  useEffect(() => {
    if (investmentProfileData) {
      form.setFieldsValue({
        risk_tolerance: getDropdownName(
          riskTolerance,
          investmentProfileData.risk_tolerance
        ),
      });
    }
  }, []);
  return (
    <Row justify="center">
      <Col xs={{ span: 24 }} sm={{span:11}} lg={{ span: 11 }}>
        <SelectComponent
          placeholder="Select from option"
          name="risk_tolerance"
          label="Risk Tolerance"
          list={riskTolerance}
          isRiskTolerance={true}
          rules={[
            {
              required: true,
              message: "Please select risk tolerance",
            },
          ]}
        />
      </Col>
      <StyledRightCol xs={{ span: 24 }} sm={{span:11}} lg={{ span: 11 }}></StyledRightCol>
    </Row>
  );
};

export default RiskTolerance;
