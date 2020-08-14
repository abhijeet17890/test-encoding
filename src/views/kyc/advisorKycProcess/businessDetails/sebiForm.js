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

const SebiForm = ({ businessDetail, form }) => {
  useEffect(() => {
    if (businessDetail) {
      if (businessDetail.sebi_registered_investment_advisor) {
        form.setFieldsValue({
          sebi_certification_registration_number:
            businessDetail.certification_registration_number,
          sebi_date_of_registration:
            businessDetail.date_of_registration !== undefined
              ? formateDate(businessDetail.date_of_registration)
              : null,
          sebi_date_of_expiry:
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
            label="SEBI Registration Number"
            name="sebi_certification_registration_number"
            rules={[
              {
                required: true,
                message: "Plese select the SEBI Registration Number",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Enter the SEBI Registration Number" />
          </StyledFormItem>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}></StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Date of Registration"
            name="sebi_date_of_registration"
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
            name="sebi_date_of_expiry"
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

export default SebiForm;
