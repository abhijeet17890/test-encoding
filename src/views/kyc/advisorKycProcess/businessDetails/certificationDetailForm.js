import React from "react";

import { Row, Col } from "antd";

import { RadioButton } from "../../../../sharedComponents/RadioButton";

import SebiForm from "./sebiForm";
import AmfiForm from "./amfiForm";

import { StyledRightCol } from "../../sharedComponents/style";
import { StyledRadioGroup } from "./style";

const CertificationDetailForm = ({
  certificateValue,
  certificateChangedHandler,
  businessDetail,
  form,
}) => {
  return (
    <React.Fragment>
      <Row justify="center">
        <StyledRadioGroup
          onChange={certificateChangedHandler}
          value={certificateValue}
        >
          <Col xs={{ span: 24 }} lg={{ span: 11 }}>
            <RadioButton value="sebi">
              SEBI Registered Investment Advisor
            </RadioButton>
          </Col>
          <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
            <RadioButton value="amfi">AMFI Registered Distributor</RadioButton>
          </StyledRightCol>
        </StyledRadioGroup>
      </Row>
      {certificateValue === "sebi" ? (
        <SebiForm
          businessDetail={businessDetail}
          form={form}
        />
      ) : (
        <AmfiForm
          businessDetail={businessDetail}
          form={form}
        />
      )}
    </React.Fragment>
  );
};

export default CertificationDetailForm;
