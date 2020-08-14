import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "antd";
import _ from "underscore";

import { useAuth } from "../../../../contextProviders/authProvider";
import { defaultValues } from "../../../../constants/defaultValues";
import { useInsideAuthApi } from "../../../../contextProviders/apiProvider";
import { formateName } from "../../../../utils/dataManipulation";

import Notification from "../../../../sharedComponents/Notification";
import Loader from "../../../../sharedComponents/Loader";

import { Button } from "../../../../sharedComponents/button";

import AdvisorTitle from "./advisorTitle";
import ContactPersonTitle from "./contactPersonTitle";
import AdvisorForm from "./advisorForm";
import ContactPersonForm from "./contactPersonForm";

import { getPostalCode, populateStateCity } from "../../postalCode";
import {
  addRemoveFormError,
  showPhoneVerificationModal,
  mobileNumberVerification,
  formatePhoneNumber,
  verifyMobileNumber,
} from "../../mobileVerification";

import { StyledButtonContainer } from "../../sharedComponents/style";

let initialValues = {
  country: "India",
  contactPhoneCountryCode: "in",
};
let apiPayload = {};

const errorMessage = "Please verify your mobile number";
const fieldName = "phone_number";

const storeKycData = (
  connectWithApi,
  payload,
  setIsLoading,
  nextStep,
  setAdvisorType
) => {
  connectWithApi()
    .storeKycData(payload)
    .then((res) => {
      setIsLoading(false);
      setAdvisorType(formateName(payload.information.advisor_type.name));
      nextStep();
    })
    .catch((error) => {
      setIsLoading(false);
      Notification({ type: "error", content: error.message });
    });
};

const updateKycData = (
  connectWithApi,
  payload,
  setIsLoading,
  nextStep,
  advisorInfoId,
  setAdvisorType
) => {
  connectWithApi()
    .updateKycData(payload, advisorInfoId)
    .then((res) => {
      setIsLoading(false);
      nextStep();
      setAdvisorType(formateName(payload.information.advisor_type.name));
    })
    .catch((error) => {
      setIsLoading(false);
      Notification({ type: "error", content: error.message });
    });
};
const getUserDetails = (
  setPhoneNumber,
  setIsNumberChanged,
  setMobileVerificationStatus,
  setIsMobileNumberVerified,
  loggedInUser,
  setDisabledVerifyButton,
  form
) => {
  let advisorMobileNumber = {};
  if (loggedInUser.personal_details) {
    const personalDetails = loggedInUser.personal_details;
    advisorMobileNumber = {
      phone_number: personalDetails.phone_number,
    };
    initialValues = { ...initialValues, ...advisorMobileNumber };
    setPhoneNumber(personalDetails.phone_number);
    setIsNumberChanged(false);
    setMobileVerificationStatus(true);
    verifyMobileNumber(
      personalDetails.phone_number,
      errorMessage,
      fieldName,
      loggedInUser,
      setIsNumberChanged,
      setDisabledVerifyButton,
      form
    );
  }
  setIsMobileNumberVerified(true);
};
const getKycData = (
  connectWithApi,
  setIsData,
  setAdvisorInfo,
  setAdvisorInfoId,
  userType,
  setAdvisorFormLoader
) => {
  const params = `kyc_type=${userType}&kyc_step=step1`;
  connectWithApi()
    .getKycData(params)
    .then((res) => {
      const response = res.data;
      if (response.length) {
        const kycData = response[0].information;
        apiPayload = {
          kyc_step: response[0].kyc_step,
          kyc_type: response[0].kyc_type,
          information: response[0].information,
        };
        setIsData(true);
        setAdvisorInfo(kycData);
        setAdvisorInfoId(response[0].id);
        initialValues["postal_code_list"] = {
          id: kycData.postal_code.id,
          name: kycData.postal_code.name,
          region_name: kycData.postal_code.region_name,
          city: kycData.postal_code.city,
          region: kycData.postal_code.region,
          district_name: kycData.postal_code.district_name,
          code: kycData.postal_code.code,
        };
        initialValues["city"] = {
          name_std:
            kycData.city.name_std === null
              ? kycData.postal_code.district_name
              : kycData.city.name_std,
          region: kycData.city.region,
        };
        initialValues["state"] = {
          name_std: kycData.state.name_std,
        };
      } else {
        setIsData(false);
      }
      setAdvisorFormLoader(false);
    })
    .catch((error) => {
      setAdvisorFormLoader(false);
      Notification({ type: "error", content: error.message });
    });
};

const AdvisorKycInfo = ({
  advisorAllGlobaliseCountries,
  advisorDropdownsStep1,
  nextStep,
  onFinishFailed,
  userType,
  getSelectedAdvObj,
  getSelectedAdvCountryObj,
  setAdvisorType,
}) => {
  const [form] = Form.useForm();
  const { loggedInUser, updateLoggedInUserInfo } = useAuth();

  const [countryCode, setCountryCode] = useState("in");

  const { connectWithApi } = useInsideAuthApi();

  const [resendLinkDisabled, setResendLinkDisabled] = useState(false);
  const [enableOTP, setEnableOTP] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const updatedData = {
    phone_number: phoneNumber,
  };
  initialValues = {
    ...initialValues,
    ...updatedData,
  };

  const [isMobileNumberVerified, setIsMobileNumberVerified] = useState(true);

  const [isNumberChanged, setIsNumberChanged] = useState(true);

  const [isPhoneNumberModalVisible, setIsPhoneNumberModalVisible] = useState();

  const [otpError, setOtpError] = useState(false);
  const [verifyPhoneLoader, setVerifyPhoneLoader] = useState(false);

  const [confirmPhoneLoader, setConfirmPhoneLoader] = useState(false);

  const closeModalHandler = (e) => {
    setIsPhoneNumberModalVisible(false);
    setEnableOTP(false);
    setResendLinkDisabled(false);
    setOtpError(false);
  };

  const [countryCode3, setCountryCode3] = useState("IND");
  const [pincode, setPincode] = useState([]);
  const [isData, setIsData] = useState(false);
  const [advisorInfo, setAdvisorInfo] = useState([]);
  const [advisorInfoId, setAdvisorInfoId] = useState();
  const [advisorFormLoader, setAdvisorFormLoader] = useState(true);
  const [mobileVerificationStatus, setMobileVerificationStatus] = useState();
  const [disabledVerifyButton, setDisabledVerifyButton] = useState(false);

  useEffect(() => {
    getKycData(
      connectWithApi,
      setIsData,
      setAdvisorInfo,
      setAdvisorInfoId,
      userType,
      setAdvisorFormLoader
    );
    getUserDetails(
      setPhoneNumber,
      setIsNumberChanged,
      setMobileVerificationStatus,
      setIsMobileNumberVerified,
      loggedInUser,
      setDisabledVerifyButton,
      form
    );
  }, []);

  const inputChangedHandler = (phoneNum, country, e, formattedValue) => {
    form.setFieldsValue({
      phone_number: formattedValue,
    });
    if (phoneNumber !== formattedValue) {
      setIsNumberChanged(true);
      setIsMobileNumberVerified(true);
    }
    setPhoneNumber(formattedValue);
    verifyMobileNumber(
      formattedValue,
      errorMessage,
      fieldName,
      loggedInUser,
      setIsNumberChanged,
      setDisabledVerifyButton,
      form
    );
  };

  function onTimerComplete() {
    setEnableOTP(false);
    setResendLinkDisabled(false);
  }

  const addressChangedHandler = (value) => {
    const selectedCountry = advisorAllGlobaliseCountries.find(
      (country) => country.name === value
    );

    const code = selectedCountry ? selectedCountry.code.toLowerCase() : null;
    setCountryCode(code);
    setCountryCode3(selectedCountry);
    setDisabledVerifyButton(false);
  };

  const isValidNumber = (value, country) => {
    if (!value) {
      form.setFieldsValue({
        phone_number: undefined,
      });
      setPhoneNumber(undefined);
    }
  };
  const otpVerification = (otp) =>
    mobileNumberVerification(
      otp,
      phoneNumber,
      connectWithApi,
      setIsPhoneNumberModalVisible,
      setOtpError,
      setIsMobileNumberVerified,
      setIsNumberChanged,
      setConfirmPhoneLoader,
      form,
      updateLoggedInUserInfo,
      setMobileVerificationStatus,
      loggedInUser,
      fieldName,
      setDisabledVerifyButton,
      errorMessage
    );

  const phoneVerificationModal = (fromWhere) =>
    showPhoneVerificationModal(
      phoneNumber,
      connectWithApi,
      setIsPhoneNumberModalVisible,
      setOtpError,
      setVerifyPhoneLoader,
      fromWhere,
      setEnableOTP,
      setResendLinkDisabled,
      setIsMobileNumberVerified,
      setIsNumberChanged,
      form,
      fieldName
    );

  const pincodeChangedHandler = (searchText) => {
    if (searchText.length > defaultValues.searchAfterChar) {
      setFetching(true);
      getPostalCode(
        connectWithApi,
        countryCode3,
        searchText,
        setPincode,
        setFetching
      );
    }
  };

  const autoPopulateStateCity = (val, key) =>
    populateStateCity(val, key, initialValues, form);

  const submitUserForm = (values) => {
    setIsLoading(true);
    const payload = {
      kyc_step: "step1",
      kyc_type: userType,
      information: {
        name: values.name.trim(),
        address: values.address.trim(),
        advisor_type: getSelectedAdvObj(
          advisorDropdownsStep1.advisor_type,
          values.advisor_type
        ),
        country: getSelectedAdvCountryObj(
          advisorAllGlobaliseCountries,
          values.country
        ),
        state: initialValues["state"],
        city: initialValues["city"],
        postal_code: initialValues["postal_code_list"],
        email_id: values.email_id,
        office_phone: formatePhoneNumber(values.office_phone),
        contact_person_name: values.contact_person_name.trim(),
        contact_person_mobile: formatePhoneNumber(values.contact_person_mobile),
        contact_person_office_phone: formatePhoneNumber(
          values.contact_person_mobile
        ),
        contact_person_email_id: values.contact_person_email_id,
      },
    };
    if (isMobileNumberVerified && isNumberChanged) {
      setIsLoading(false);
      addRemoveFormError(fieldName, false, errorMessage, form);
      onFinishFailed();
      return;
    }
    if (mobileVerificationStatus) {
      if (_.isEqual(apiPayload, payload)) {
        setIsLoading(false);
        nextStep();
      } else {
        if (isData) {
          updateKycData(
            connectWithApi,
            payload,
            setIsLoading,
            nextStep,
            advisorInfoId,
            setAdvisorType
          );
        } else {
          storeKycData(
            connectWithApi,
            payload,
            setIsLoading,
            nextStep,
            setAdvisorType
          );
        }
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      {advisorFormLoader ? (
        <Row justify="center">
          <Col>
            <Loader size="large" spinning={advisorFormLoader} />
          </Col>
        </Row>
      ) : (
        <Form
          layout="vertical"
          onFinish={submitUserForm}
          initialValues={initialValues}
          onFinishFailed={onFinishFailed}
          hideRequiredMark
          form={form}
        >
          <AdvisorTitle />
          <AdvisorForm
            advisorAllGlobaliseCountries={advisorAllGlobaliseCountries}
            advisorDropdownsStep1={advisorDropdownsStep1}
            countryCode={countryCode}
            addressChangedHandler={addressChangedHandler}
            form={form}
            loggedInUser={loggedInUser}
            closeModalHandler={closeModalHandler}
            isPhoneNumberModalVisible={isPhoneNumberModalVisible}
            showPhoneVerificationModal={phoneVerificationModal}
            confirmPhoneLoader={confirmPhoneLoader}
            otpVerification={otpVerification}
            resendLinkDisabled={resendLinkDisabled}
            otpError={otpError}
            onTimerComplete={onTimerComplete}
            enableOTP={enableOTP}
            inputChangedHandler={inputChangedHandler}
            isValidNumber={isValidNumber}
            initialValues={initialValues}
            verifyPhoneLoader={verifyPhoneLoader}
            isMobileNumberVerified={isMobileNumberVerified}
            pincodeChangedHandler={pincodeChangedHandler}
            autoPopulateStateCity={autoPopulateStateCity}
            pincode={pincode}
            fetching={fetching}
            advisorInfo={advisorInfo}
            setAdvisorType={setAdvisorType}
            disabledVerifyButton={disabledVerifyButton}
          />
          <ContactPersonTitle />
          <ContactPersonForm initialValues={initialValues} form={form} />
          <StyledButtonContainer justify="center">
            <Col>
              <Button loading={isLoading} htmlType="submit" size="lg">
                Next
              </Button>
            </Col>
          </StyledButtonContainer>
        </Form>
      )}
    </React.Fragment>
  );
};

export default AdvisorKycInfo;
