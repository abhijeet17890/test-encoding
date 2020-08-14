import React, { useEffect } from "react";
import { Row, Col } from "antd";

import {
  disabledPastDate,
  disabledFutureDate,
  datePickerFormat,
  formateDate,
} from "../../../../utils/dataManipulation";

import { Input } from "../../../../sharedComponents/Input";
import DatePicker from "../../../../sharedComponents/datePicker";

import { StyledFormItem, StyledRightCol } from "../../sharedComponents/style";

const AmfiForm = ({ businessDetail, form }) => {
  useEffect(() => {
    if (businessDetail) {
      if (!businessDetail.sebi_registered_investment_advisor) {
        form.setFieldsValue({
          amfi_certification_registration_number:
            businessDetail.certification_registration_number,
          amfi_date_of_registration:
            businessDetail.date_of_registration !== undefined
              ? formateDate(businessDetail.date_of_registration)
              : null,
          amfi_date_of_expiry:
            businessDetail.date_of_expiry !== undefined
              ? formateDate(businessDetail.date_of_expiry)
              : null,
        });
      }
    }
  }, []);

  return (
    <React.Fragment>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="AMFI Registration Number(ARN)"
            name="amfi_certification_registration_number"
            rules={[
              {
                required: true,
                message: "Plese select the AMFI registration number",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Enter the AMFI registration number" />
          </StyledFormItem>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}></StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Date of Registration"
            name="amfi_date_of_registration"
            rules={[
              {
                required: true,
                message: "Plese select the date of registration",
              },
            ]}
          >
            <DatePicker
              placeholder="Select the date of registration"
              format={datePickerFormat}
              showToday={false}
              suffixIcon={false}
              allowClear={false}
              inputReadOnly={true}
              disabledDate={disabledFutureDate}
            />
          </StyledFormItem>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Date of Expiry"
            name="amfi_date_of_expiry"
            rules={[
              {
                required: true,
                message: "Plese select the date of expiry",
              },
            ]}
          >
            <DatePicker
              placeholder="Select the date of expiry"
              format={datePickerFormat}
              showToday={false}
              suffixIcon={false}
              allowClear={false}
              inputReadOnly={true}
              disabledDate={disabledPastDate}
            />
          </StyledFormItem>
        </StyledRightCol>
      </Row>
    </React.Fragment>
  );
};

export default AmfiForm;
