import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";

import {
  disabledFutureDate,
  datePickerFormat,
  formateDate,
} from "../../../../utils/dataManipulation";
import { regExp } from "../../../../constants/regExp";

import { Input } from "../../../../sharedComponents/Input";
import DatePicker from "../../../../sharedComponents/datePicker";

import {
  StyledFormItem,
  StyledRightCol,
  StyledRow,
} from "../../sharedComponents/style";

const RegistrationDetailForm = ({
  selectedAdvisorType,
  businessDetail,
  form,
}) => {
  const [aadhaarRule, setAadhaarRule] = useState(false);
  const [incorporationRule, setIncorporationRule] = useState(false);

  const requiredFields = () => {
    if (
      selectedAdvisorType === "Individual" ||
      selectedAdvisorType === "Sole proprietorship"
    ) {
      setAadhaarRule(true);
      setIncorporationRule(true);
    } else {
      setAadhaarRule(false);
      setIncorporationRule(false);
    }
  };

  useEffect(() => {
    requiredFields();
  }, [selectedAdvisorType]);

  useEffect(() => {
    if (businessDetail) {
      form.setFieldsValue({
        date_of_incorporation:
          businessDetail.date_of_incorporation !== undefined
            ? formateDate(businessDetail.date_of_incorporation)
            : null,
        pan_number: businessDetail.pan_number,
        aadhaar_number: businessDetail.aadhaar_number,
        gst_registration_number: businessDetail.gst_registration_number,
      });
    }
  }, []);

  return (
    <React.Fragment>
      <StyledRow justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Date of Incorporation"
            name="date_of_incorporation"
            rules={[
              {
                required: incorporationRule,
                message: "Plese select the date of incorporation",
              },
            ]}
          >
            <DatePicker
              placeholder="Select the date of incorporation"
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
            label="PAN"
            name="pan_number"
            rules={[
              {
                required: true,
                message: " ",
                whitespace: true,
                pattern: regExp.Pan,
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (value && !regExp.Pan.test(value)) {
                    return Promise.reject("Please enter valid PAN");
                  } else if (value && regExp.Pan.test(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Please enter your PAN");
                  }
                },
              }),
            ]}
          >
            <Input placeholder="Enter your PAN" />
          </StyledFormItem>
        </StyledRightCol>
      </StyledRow>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Aadhaar Number"
            name="aadhaar_number"
            rules={[
              {
                required: aadhaarRule,
                message: "Please enter the aadhaar number",
                whitespace: true,
                pattern: regExp.Aadhaar,
              },
            ]}
          >
            <Input placeholder="Enter the Aadhaar number" />
          </StyledFormItem>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="GST Registration Number"
            name="gst_registration_number"
            rules={[
              {
                required: true,
                message: " ",
                whitespace: true,
                pattern: regExp.Gst,
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (value && !regExp.Gst.test(value)) {
                    return Promise.reject(
                      "Please enter valid GST registration number"
                    );
                  } else if (value && regExp.Gst.test(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      "Please enter your GST registration number"
                    );
                  }
                },
              }),
            ]}
          >
            <Input placeholder="Enter the GST registration number" />
          </StyledFormItem>
        </StyledRightCol>
      </Row>
    </React.Fragment>
  );
};

export default RegistrationDetailForm;
