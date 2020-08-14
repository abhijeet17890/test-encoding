import React from "react";

import { Row, Col } from "antd";

import { Input } from "../../../../sharedComponents/Input";
import { Checkbox } from "../../../../sharedComponents/Checkbox";
import PhoneNumber from "../../../../sharedComponents/phoneInput";

import { StyledFormItem, StyledRightCol } from "../../sharedComponents/style";

const ContactPersonForm = ({ initialValues, form }) => {
  const contactPersonCheckboxHandler = (event) => {
    if (event.target.checked) {
      const contactMobileNumber = form.getFieldsValue().contact_person_mobile;
      form.setFieldsValue({
        contact_person_office_phone: contactMobileNumber,
      });
    }
  };

  const contactPersonMobile = (phoneNum, country, e, formattedValue) => {
    form.setFieldsValue({
      contact_person_mobile: formattedValue,
    });
  };

  const contactPersonOfficePhone = (phoneNum, country, e, formattedValue) => {
    form.setFieldsValue({
      contact_person_office_phone: formattedValue,
    });
  };
  return (
    <React.Fragment>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Name"
            name="contact_person_name"
            rules={[
              {
                required: true,
                message: "Please enter the contact person's name",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Enter the contact person's name" />
          </StyledFormItem>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Mobile"
            name="contact_person_mobile"
            rules={[
              {
                required: true,
                message: "Please enter mobile number",
                whitespace: true,
              },
            ]}
          >
            <PhoneNumber
              country={initialValues.contactPhoneCountryCode}
              placeholder="Enter the mobile number"
              onChange={contactPersonMobile}
            />
          </StyledFormItem>
        </StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Office Phone"
            name="contact_person_office_phone"
            rules={[
              {
                required: true,
                message: "Please enter the office number",
                whitespace: true,
              },
            ]}
          >
            <PhoneNumber
              country={initialValues.contactPhoneCountryCode}
              placeholder="Enter the office number "
              onChange={contactPersonOfficePhone}
            />
          </StyledFormItem>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Email ID"
            name="contact_person_email_id"
            rules={[
              {
                required: true,
                message: "Please enter email id",
                whitespace: true,
              },
              {
                type: "email",
                message: "Please enter valid email id",
              },
            ]}
          >
            <Input placeholder="Enter the email address" />
          </StyledFormItem>
        </StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <Checkbox onClick={contactPersonCheckboxHandler}>
            Same as mobile number
          </Checkbox>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}></StyledRightCol>
      </Row>
    </React.Fragment>
  );
};

export default ContactPersonForm;
