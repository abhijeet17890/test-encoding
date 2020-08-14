import React, { useState, useEffect } from "react";
import moment from "moment";
import _ from "underscore";
import { Form, Row, Col } from "antd";

import { useInsideAuthApi } from "../../../contextProviders/apiProvider";
import { useAuth } from "../../../contextProviders/authProvider";
import Notification from "../../../sharedComponents/Notification";
import { Button } from "../../../sharedComponents/button/index";
import { Modal } from "../../../sharedComponents/Modal";
import { defaultValues } from "../../../constants/defaultValues";
import Loader from "../../../sharedComponents/Loader";

import Title from "../customerKycForm/title";
import BasicInformation from "../customerKycForm/userInfo/basicInformation";
import AddressInformation from "../customerKycForm/userInfo/addressInformation";

import {
  getCountryList,
  addressChangedEvent,
  citizenshipChangedEvent,
  hideShowCountryErrorMessage
} from "../customerKycForm/userInfo/countryList";
import { getPostalCode, populateStateCity } from "../postalCode";
import {
  addRemoveFormError,
  showPhoneVerificationModal,
  mobileNumberVerification,
  formatePhoneNumber,
  verifyMobileNumber,
  phoneFieldName,
  phoneErrorMessage,
} from "../mobileVerification";

import { StyledBottomButton, Message } from "../sharedComponents/style";

let initialValues = {
  citizenship: "India",
  country: "India",
};

let apiPayload = {};

const storeKycData = (
  connectWithApi,
  payload,
  setIsLoading,
  nextStep,
  updateFirstName,
  updateLastName
) => {
  connectWithApi()
    .storeKycData(payload)
    .then((res) => {
      setIsLoading(false);
      updateFirstName(payload.information.first_name);
      updateLastName(payload.information.last_name);
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
  userProfileDataId,
  updateFirstName,
  updateLastName
) => {
  connectWithApi()
    .updateKycData(payload, userProfileDataId)
    .then((res) => {
      setIsLoading(false);
      nextStep();
      updateFirstName(payload.information.first_name);
      updateLastName(payload.information.last_name);
    })
    .catch((error) => {
      setIsLoading(false);
      Notification({ type: "error", content: error.message });
    });
};

const openInfoModal = (setInfoModalVisible) => setInfoModalVisible(true);

const getKycData = (
  connectWithApi,
  setIsData,
  setUserProfileData,
  setUserProfileDataId,
  setPhoneNumber,
  setDropdownLoader,
  userType,
  loggedInUser,
  setIsNumberChanged,
  setMobileVerificationStatus,
  setDisabledVerifyButton,
  form
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
        setUserProfileData(kycData);
        setUserProfileDataId(response[0].id);
        const personalDetails = loggedInUser.personal_details;
        let phoneNumber;
        phoneNumber = personalDetails?.phone_number;
        if (phoneNumber === kycData.phonenumber) {
          setIsNumberChanged(false);
          setMobileVerificationStatus(true);
          if (personalDetails.phone_number) {
            verifyMobileNumber(
              personalDetails.phone_number,
              phoneErrorMessage,
              phoneFieldName,
              loggedInUser,
              setIsNumberChanged,
              setDisabledVerifyButton,
              form
            );
          }
        } else {
          setIsNumberChanged(true);
          verifyMobileNumber(
            kycData.phonenumber,
            phoneErrorMessage,
            phoneFieldName,
            loggedInUser,
            setIsNumberChanged,
            setDisabledVerifyButton,
            form
          );
        }
        setPhoneNumber(kycData.phonenumber);
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
      setDropdownLoader(false);
    })
    .catch((error) => {
      setDropdownLoader(false);
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
  let userName = {};
  if (loggedInUser.personal_details) {
    const personalDetails = loggedInUser.personal_details;
    userName = {
      first_name: personalDetails.first_name,
      last_name: personalDetails.last_name,
    };
    initialValues = { ...initialValues, ...userName };
    setPhoneNumber(personalDetails.phone_number);
    setIsNumberChanged(false);
    setMobileVerificationStatus(true);
    if (personalDetails.phone_number) {
      verifyMobileNumber(
        personalDetails.phone_number,
        phoneErrorMessage,
        phoneFieldName,
        loggedInUser,
        setIsNumberChanged,
        setDisabledVerifyButton,
        form
      );
    }
  }
  setIsMobileNumberVerified(true);
};

const UserInfo = ({
  nextStep,
  onFinishFailed,
  getSelectedObj,
  steps1DropDown,
  isStep,
  userType,
  updateFirstName,
  updateLastName,
  isCustomer,
}) => {
  const { connectWithApi } = useInsideAuthApi();
  const { loggedInUser, updateLoggedInUserInfo } = useAuth();

  const [resendLinkDisabled, setResendLinkDisabled] = useState(false);
  const [enableOTP, setEnableOTP] = useState(false);
  const [countries, setCountries] = useState([]);

  const [maritalStatus, setMaritalStatus] = useState();
  const [gender, setGender] = useState();

  const [phoneNumber, setPhoneNumber] = useState();

  const [isCountryActive, setCountryActive] = useState(true);
  const [countryCode, setCountryCode] = useState("in");

  const [isLoading, setIsLoading] = useState(false);

  const [isValidCitizenship, setIsValidCitizenship] = useState(true);
  const [dropdownLoader, setDropdownLoader] = useState(true);

  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [form] = Form.useForm();

  const updatedData = {
    phone_number: phoneNumber,
  };
  initialValues = {
    ...initialValues,
    ...updatedData,
  };

  const [isMobileNumberVerified, setIsMobileNumberVerified] = useState();

  const [isNumberChanged, setIsNumberChanged] = useState(true);

  const [mobileVerificationStatus, setMobileVerificationStatus] = useState();

  const [isPhoneNumberModalVisible, setIsPhoneNumberModalVisible] = useState();

  const [otpError, setOtpError] = useState(false);
  const [verifyPhoneLoader, setVerifyPhoneLoader] = useState(false);

  const [confirmPhoneLoader, setConfirmPhoneLoader] = useState(false);

  const [pincode, setPincode] = useState([]);
  const [isData, setIsData] = useState(false);
  const [userProfileData, setUserProfileData] = useState();
  const [userProfileDataId, setUserProfileDataId] = useState();

  const [disabledVerifyButton, setDisabledVerifyButton] = useState(false);

  const [countryCode3, setCountryCode3] = useState("IND");

  const usTacResidentEvent = (event) => {
    if (event.target.checked) {
      openInfoModal(setInfoModalVisible);
    }
  };

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

  useEffect(() => {
    getKycData(
      connectWithApi,
      setIsData,
      setUserProfileData,
      setUserProfileDataId,
      setPhoneNumber,
      setDropdownLoader,
      userType,
      loggedInUser,
      setIsNumberChanged,
      setIsMobileNumberVerified,
      setDisabledVerifyButton,
      form
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
    getCountryList(connectWithApi, setCountries);
  }, [isData]);

  useEffect(() => {
    if (isStep) {
      setMaritalStatus(steps1DropDown?.marital_status);
      setGender(steps1DropDown?.gender);
    }
  }, [isStep]);

  const infoModalHandleOK = () => setInfoModalVisible(false);

  const submitUserForm = (values) => {
    setIsLoading(true);
    let address2;
    let payload = {
      kyc_step: "step1",
      kyc_type: userType,
      information: {
        dobday: values.date,
        dobmonth: parseInt(moment().month(values.month).format("M")),
        dobyear: values.year,
        first_name: values.first_name.trim(),
        last_name: values.last_name.trim(),
        gender: getSelectedObj(gender, values.gender),
        tax_id: values.pan.trim(),
        phonenumber: formatePhoneNumber(values.phone_number),
        citizenship: getSelectedObj(countries, values.citizenship),
        marital_status: getSelectedObj(maritalStatus, values.marital_status),
        postal_code: initialValues["postal_code_list"],
        city: initialValues["city"],
        state: initialValues["state"],
        country: getSelectedObj(countries, values.country),
        address1: values.address1.trim(),
      },
    };
    hideShowCountryErrorMessage(isCountryActive, form);
    if (values.address2) {
      address2 = {
        address2: values.address2,
      };
      payload.information = { ...payload.information, ...address2 };
    }
    if (isMobileNumberVerified && isNumberChanged) {
      setIsLoading(false);
      addRemoveFormError(phoneFieldName, false, phoneErrorMessage, form);
      onFinishFailed();
      return;
    }
    if (isCountryActive && isValidCitizenship && mobileVerificationStatus) {
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
            userProfileDataId,
            updateFirstName,
            updateLastName
          );
        } else {
          storeKycData(
            connectWithApi,
            payload,
            setIsLoading,
            nextStep,
            updateFirstName,
            updateLastName
          );
        }
      }
    } else {
      setIsLoading(false);
    }
  };

  const addressChangedHandler = (value) =>
    addressChangedEvent(
      value,
      setCountryActive,
      setCountryCode3,
      countries,
      form
    );

  function onTimerComplete() {
    setEnableOTP(false);
    setResendLinkDisabled(false);
  }
  const citizenshipChangedHandler = (value) =>
    citizenshipChangedEvent(
      value,
      countries,
      setIsValidCitizenship,
      openInfoModal,
      setInfoModalVisible,
      setCountryCode
    );

  const closeModalHandler = (e) => {
    setIsPhoneNumberModalVisible(false);
    setEnableOTP(false);
    setResendLinkDisabled(false);
    setOtpError(false);
  };

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
      phoneErrorMessage,
      phoneFieldName,
      loggedInUser,
      setIsNumberChanged,
      setDisabledVerifyButton,
      form
    );
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
      phoneFieldName,
      setDisabledVerifyButton,
      phoneErrorMessage
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
      phoneFieldName
    );
  const basicInforProps = {
    form: form,
    countries: countries,
    countryCode: countryCode,
    isPhoneNumberModalVisible: isPhoneNumberModalVisible,
    isValidNumber: isValidNumber,
    otpError: otpError,
    confirmPhoneLoader: confirmPhoneLoader,
    isMobileNumberVerified: isMobileNumberVerified,
    verifyPhoneLoader: verifyPhoneLoader,
    initialValues: initialValues,
    citizenshipChangedHandler: citizenshipChangedHandler,
    showPhoneVerificationModal: phoneVerificationModal,
    closeModalHandler: closeModalHandler,
    inputChangedHandler: inputChangedHandler,
    otpVerification: otpVerification,
    userProfileData: userProfileData,
    onTimerComplete: onTimerComplete,
    resendLinkDisabled: resendLinkDisabled,
    enableOTP: enableOTP,
    phoneNumber: phoneNumber,
    usTacResidentEvent: usTacResidentEvent,
    maritalStatus: maritalStatus,
    gender: gender,
    isData: isData,
    isCustomer: isCustomer,
    disabledVerifyButton: disabledVerifyButton,
  };

  const autoPopulateStateCity = (val, key) =>
    populateStateCity(val, key, initialValues, form);

  return (
    <React.Fragment>
      {dropdownLoader ? (
        <Row justify="center">
          <Col>
            <Loader size="large" spinning={dropdownLoader} />
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
          <Title title="Basic Information" />
          <BasicInformation basicInforProps={basicInforProps} />
          <Modal
            title="US Tax Resident"
            visible={infoModalVisible}
            onCancel={infoModalHandleOK}
            centered={true}
            footer={[
              <Button
                key="back"
                size="md-2"
                onClick={() => infoModalHandleOK()}
              >
                OK
              </Button>,
            ]}
          >
            <Message>Please contact customer service</Message>
          </Modal>
          <Title title="Address Information" />
          <AddressInformation
            countries={countries}
            addressChangedHandler={addressChangedHandler}
            isCountryActive={isCountryActive}
            userProfileData={userProfileData}
            form={form}
            initialValues={initialValues}
            pincodeChangedHandler={pincodeChangedHandler}
            pincode={pincode}
            autoPopulateStateCity={autoPopulateStateCity}
            fetching={fetching}
          />
          <StyledBottomButton justify="center">
            <Col>
              <Button loading={isLoading} htmlType="submit" size="lg">
                Next
              </Button>
            </Col>
          </StyledBottomButton>
        </Form>
      )}
    </React.Fragment>
  );
};

export default UserInfo;
