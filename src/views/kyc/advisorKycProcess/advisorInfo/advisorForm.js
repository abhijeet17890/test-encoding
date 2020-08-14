import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";

import { formateName } from "../../../../utils/dataManipulation";

import { Input } from "../../../../sharedComponents/Input";
import { Button } from "../../../../sharedComponents/button";
import Loader from "../../../../sharedComponents/Loader";
import { Checkbox } from "../../../../sharedComponents/Checkbox";
import PhoneNumber from "../../../../sharedComponents/phoneInput";

import SelectComponent from "../../sharedComponents/selectComponent";
import MobileVerificationModal from "../../sharedComponents/mobileVerificationModal";

import {
  StyledFormItem,
  StyledRightCol,
  StyledDiv,
  TickIcon,
} from "../../sharedComponents/style";

const AdvisorForm = ({
  advisorAllGlobaliseCountries,
  countryCode,
  advisorDropdownsStep1,
  addressChangedHandler,
  form,
  loggedInUser,
  closeModalHandler,
  isPhoneNumberModalVisible,
  showPhoneVerificationModal,
  confirmPhoneLoader,
  otpVerification,
  resendLinkDisabled,
  otpError,
  onTimerComplete,
  enableOTP,
  inputChangedHandler,
  isValidNumber,
  initialValues,
  verifyPhoneLoader,
  pincodeChangedHandler,
  autoPopulateStateCity,
  pincode,
  fetching,
  advisorInfo,
  setAdvisorType,
  disabledVerifyButton,
}) => {
  useEffect(() => {
    form.setFieldsValue({
      phone_number: loggedInUser.personal_details?.phone_number,
    });
    if (advisorInfo) {
      form.setFieldsValue({
        name: advisorInfo.name,
        address: advisorInfo.address,
        advisor_type: formateName(advisorInfo.advisor_type?.name),
        country:
          advisorInfo.country !== undefined
            ? advisorInfo.country.name
            : initialValues["country"],
        state: advisorInfo.state?.name_std,
        city: advisorInfo.city?.name_std,
        postal_code: advisorInfo.postal_code?.code,
        email_id:
          advisorInfo.email_id === undefined
            ? loggedInUser.email
            : advisorInfo.email_id,
        office_phone: advisorInfo.office_phone,
        contact_person_name: advisorInfo.contact_person_name,
        contact_person_mobile: advisorInfo.contact_person_mobile,
        contact_person_office_phone: advisorInfo.contact_person_mobile,
        contact_person_email_id: advisorInfo.contact_person_email_id,
      });
      setAdvisorType(formateName(advisorInfo.advisor_type?.name));
    }
  }, []);

  const [otpValue, setOTPValue] = useState("");

  const otpChangedHandler = (e) => setOTPValue(e);

  const advisorPersonCheckboxHandler = (event) => {
    if (event.target.checked) {
      const advisorMobileNumber = form.getFieldsValue().phone_number;
      form.setFieldsValue({
        office_phone: advisorMobileNumber,
      });
    }
  };

  const advisorOfficePhone = (phoneNum, country, e, formattedValue) => {
    form.setFieldsValue({
      office_phone: formattedValue,
    });
  };

  return (
    <StyledDiv>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your name",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Enter your name" />
          </StyledFormItem>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
          <SelectComponent
            name="advisor_type"
            label="Type of Advisor"
            placeholder="Select your advisor type"
            list={advisorDropdownsStep1.advisor_type}
            isAdvisorType={true}
            rules={[
              {
                required: true,
                message: "Please select your advisor type",
              },
            ]}
          />
        </StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please enter your address",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Enter your address" />
          </StyledFormItem>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
          <SelectComponent
            name="postal_code"
            label="Postal Code"
            placeholder="Select pincode"
            list={pincode}
            rules={[
              {
                required: true,
                message: "Please select postal code",
              },
            ]}
            isPincode={true}
            onSearch={pincodeChangedHandler}
            onSelect={autoPopulateStateCity}
            notFoundContent={fetching ? <Loader /> : "No data"}
          />
        </StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem label="State" name="state">
            <Input placeholder="State" disabled={true} />
          </StyledFormItem>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem label="City" name="city">
            <Input placeholder="City" disabled={true} />
          </StyledFormItem>
        </StyledRightCol>
      </Row>

      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <SelectComponent
            name="country"
            label="Country"
            placeholder="Select an option"
            list={advisorAllGlobaliseCountries}
            rules={[
              {
                required: true,
                message: "Please select country",
              },
            ]}
            isCountry={true}
            changedHandler={addressChangedHandler}
          />
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 19 }}>
              <StyledFormItem
                label="Mobile"
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Please enter your mobile number",
                    whitespace: true,
                  },
                ]}
              >
                <PhoneNumber
                  country={countryCode}
                  placeholder="Enter your mobile number"
                  onChange={inputChangedHandler}
                  value={initialValues["phone_number"]}
                  isValid={isValidNumber}
                />
                {disabledVerifyButton ? <TickIcon /> : null}
              </StyledFormItem>
            </Col>
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
          </Row>
        </StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Office Phone"
            name="office_phone"
            rules={[
              {
                required: true,
                message: "Please enter your office number",
                whitespace: true,
              },
            ]}
          >
            <PhoneNumber
              country={initialValues.contactPhoneCountryCode}
              placeholder="Enter your office number"
              onChange={advisorOfficePhone}
            />
          </StyledFormItem>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Email ID"
            name="email_id"
            rules={[
              {
                required: true,
                message: "Please enter your email id",
                whitespace: true,
              },
              {
                type: "email",
                message: "Please enter valid email id",
              },
            ]}
          >
            <Input placeholder="Enter your email address" />
          </StyledFormItem>
        </StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <Checkbox onClick={advisorPersonCheckboxHandler}>
            Same as mobile number
          </Checkbox>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}></StyledRightCol>
      </Row>
    </StyledDiv>
  );
};

export default AdvisorForm;
