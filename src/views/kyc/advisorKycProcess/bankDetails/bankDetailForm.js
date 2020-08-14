import React, { useEffect } from "react";
import { Row, Col } from "antd";
import { useHistory, useLocation } from "react-router-dom";

import { routes } from "../../../../constants/routes";

import { Input } from "../../../../sharedComponents/Input";
import { Checkbox } from "../../../../sharedComponents/Checkbox";

import { ErrorMessage } from "../../sharedComponents/style";

import {
  StyledFormItem,
  StyledRightCol,
  StyledDiv,
  StyledCheckboxText,
} from "../../sharedComponents/style";

const BankDetailsForm = ({
  isChecked,
  showErrorMessage,
  changedHandler,
  bankDetail,
  form,
}) => {
  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    const details = form.getFieldValue();
    const bankDetails = {
      account_holder_name: details.account_holder_name,
      bank_name: details.bank_name,
      account_number: details.account_number,
      ifsc_code: details.ifsc_code,
    };
    history.push({
      pathname: routes.authRoutes.advisorKycDisclosures,
      state: {
        disclosureAgree: isChecked,
        bankDetails: bankDetails,
      },
    });
  };
  const fillForm = (detail) => {
    form.setFieldsValue({
      account_holder_name: detail.account_holder_name,
      bank_name: detail.bank_name,
      account_number: detail.account_number,
      ifsc_code: detail.ifsc_code,
    });
  };
  useEffect(() => {
    if (bankDetail) {
      fillForm(bankDetail);
    }
    if (location.state && location.state.bankDetails) {
      fillForm(location.state.bankDetails);
    }
  }, []);

  return (
    <StyledDiv>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Account Holder Name"
            name="account_holder_name"
            rules={[
              {
                required: true,
                message: "Please enter account holder name",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Enter the account holder name" />
          </StyledFormItem>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Bank Name"
            name="bank_name"
            rules={[
              {
                required: true,
                message: "Please enter bank name",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Enter the bank name" />
          </StyledFormItem>
        </StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Account Number"
            name="account_number"
            rules={[
              {
                required: true,
                message: "Please enter account number",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Enter the account number " />
          </StyledFormItem>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="IFSC Code"
            name="ifsc_code"
            rules={[
              {
                required: true,
                message: "Please enter IFSC code",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Enter the IFSC Code" />
          </StyledFormItem>
        </StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <Checkbox onChange={changedHandler} checked={isChecked} />
          <StyledCheckboxText>
            I agree to the
            <span className="disclosures-link" onClick={() => handleClick()}>
              disclosures
            </span>
          </StyledCheckboxText>
          {!isChecked && !showErrorMessage ? (
            <ErrorMessage className="agreement-error error-message-redirection">
              Should accept agreement
            </ErrorMessage>
          ) : null}
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}></StyledRightCol>
      </Row>
    </StyledDiv>
  );
};

export default BankDetailsForm;
