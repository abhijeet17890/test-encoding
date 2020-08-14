import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import _ from "underscore";

import { regExp } from "../../../../constants/regExp";

import { Checkbox } from "../../../../sharedComponents/Checkbox";
import { Button } from "../../../../sharedComponents/button";
import { Input } from "../../../../sharedComponents/Input";
import PhoneNumber from "../../../../sharedComponents/phoneInput";

import MobileVerificationModal from "../../sharedComponents/mobileVerificationModal";

import DateOfBirth from "./dateOfBirth";
import SelectComponent from "../../sharedComponents/selectComponent";

import {
  StyledFormItem,
  StyledRightCol,
  TickIcon,
} from "../../sharedComponents/style";

const BasicInformation = ({ basicInforProps }) => {
  let form;
  const citizenship = _.filter(basicInforProps.countries, function (country) {
    return country.active === true;
  });
  const {
    countryCode,
    isPhoneNumberModalVisible,
    isValidNumber,
    otpError,
    confirmPhoneLoader,
    verifyPhoneLoader,
    initialValues,
    citizenshipChangedHandler,
    showPhoneVerificationModal,
    closeModalHandler,
    inputChangedHandler,
    otpVerification,
    userProfileData,
    onTimerComplete,
    resendLinkDisabled,
    enableOTP,
    usTacResidentEvent,
    maritalStatus,
    gender,
    isCustomer,
    disabledVerifyButton,
  } = basicInforProps;

  const [otpValue, setOTPValue] = useState("");
  const otpChangedHandler = (e) => setOTPValue(e);
  const maritalStatusTemplate = (
    <SelectComponent
      name="marital_status"
      label="Marital Status"
      placeholder="Select"
      list={maritalStatus}
      isJsonObject={true}
      rules={[
        {
          required: true,
          message: "Please select marital status",
        },
      ]}
    />
  );

  useEffect(() => {
    form = basicInforProps.form;
    if (userProfileData) {
      form.setFieldsValue({
        phone_number:
          userProfileData.phonenumber !== undefined
            ? userProfileData.phonenumber
            : initialValues["phone_number"],
        first_name:
          userProfileData.first_name !== undefined
            ? userProfileData.first_name
            : initialValues["first_name"],
        last_name:
          userProfileData.last_name !== undefined
            ? userProfileData.last_name
            : initialValues["last_name"],
        gender: userProfileData.gender?.name,
        country: userProfileData.country,
        marital_status: userProfileData.marital_status?.name,
        citizenship:
          userProfileData.citizenship !== undefined
            ? userProfileData.citizenship?.name
            : initialValues["citizenship"],
        pan: userProfileData.tax_id,
      });
    }
  }, []);
  return (
    <React.Fragment>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="First Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please enter your first name",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Enter your first name" />
          </StyledFormItem>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please enter your last name",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Enter your last name" />
          </StyledFormItem>
        </StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <DateOfBirth
                form={basicInforProps.form}
                userProfileData={userProfileData}
                initialValues={initialValues}
              />
            </Col>
            <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
              <SelectComponent
                name="gender"
                label="Gender"
                placeholder="Select"
                list={gender}
                isJsonObject={true}
                rules={[
                  {
                    required: true,
                    message: "Please select gender",
                  },
                ]}
              />
            </StyledRightCol>
          </Row>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 11 }}>
              {maritalStatusTemplate}
            </Col>
            <StyledRightCol xs={{ span: 24 }} lg={{ span: 12 }}>
              <SelectComponent
                placeholder="Select"
                list={citizenship}
                name="citizenship"
                label="Citizenship"
                className="half-select"
                isJsonObject={true}
                rules={[
                  {
                    required: true,
                    message: "Please select citizenship",
                  },
                ]}
                changedHandler={citizenshipChangedHandler}
              />
            </StyledRightCol>
          </Row>
        </StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="PAN"
            name="pan"
            rules={[
              {
                required: true,
                whitespace: true,
                message: " ",
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
          <Checkbox onChange={usTacResidentEvent}>
            I am a US tax resident.
          </Checkbox>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: isCustomer ? 19 : 24 }}>
              <StyledFormItem
                label="Phone Number"
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                    whitespace: true,
                  },
                ]}
              >
                <PhoneNumber
                  country={countryCode}
                  placeholder="Enter your phone number"
                  onChange={inputChangedHandler}
                  value={initialValues["phone_number"]}
                  isValid={isValidNumber}
                />
                {disabledVerifyButton && isCustomer ? <TickIcon /> : null}
              </StyledFormItem>
            </Col>
            {isCustomer ? (
              <StyledRightCol xs={{ span: 2 }} lg={{ span: 2 }}>
                <StyledFormItem label="&nbsp;" rules={[{ required: true }]}>
                  <Button
                    htmlType="button"
                    onClick={() => showPhoneVerificationModal("view-botton")}
                    loading={verifyPhoneLoader}
                    size="sm-2"
                    disabled={disabledVerifyButton}
                  >
                    Verify
                  </Button>
                  <MobileVerificationModal
                    isPhoneNumberModalVisible={isPhoneNumberModalVisible}
                    closeModalHandler={closeModalHandler}
                    otpChangedHandler={otpChangedHandler}
                    otpValue={otpValue}
                    confirmPhoneLoader={confirmPhoneLoader}
                    otpVerification={otpVerification}
                    resendLinkDisabled={resendLinkDisabled}
                    otpError={otpError}
                    onTimerComplete={onTimerComplete}
                    enableOTP={enableOTP}
                    showPhoneVerificationModal={showPhoneVerificationModal}
                  />
                </StyledFormItem>
              </StyledRightCol>
            ) : null}
          </Row>
        </StyledRightCol>
      </Row>
    </React.Fragment>
  );
};

export default BasicInformation;
