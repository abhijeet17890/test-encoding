import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "antd";
import moment from "moment";
import _ from "underscore";

import { useInsideAuthApi } from "../../../contextProviders/apiProvider";
import { defaultValues } from "../../../constants/defaultValues";
import { scrollToTop } from "../../../utils/dataManipulation";

import Loader from "../../../sharedComponents/Loader";
import { Button } from "../../../sharedComponents/button";
import { Modal } from "../../../sharedComponents/Modal";
import Notification from "../../../sharedComponents/Notification";

import ClientName from "./clientName";
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
import { formatePhoneNumber } from "../mobileVerification";

import { StyledBottomButton, Message } from "../sharedComponents/style";

let initialValues = {
  citizenship: "India",
  country: "India",
};

let apiPayload = {};

const openInfoModal = (setInfoModalVisible) => setInfoModalVisible(true);

const storeKycData = (connectWithApi, payload, setIsLoading, nextStep) => {
  connectWithApi()
    .storeKycData(payload)
    .then((res) => {
      setIsLoading(false);
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
  params
) => {
  connectWithApi()
    .updateKycData(payload, params)
    .then((res) => {
      setIsLoading(false);
      nextStep();
    })
    .catch((error) => {
      setIsLoading(false);
      Notification({ type: "error", content: error.message });
    });
};

const getKycData = (
  connectWithApi,
  setIsData,
  setUserProfileData,
  setUserProfileDataId,
  setPhoneNumber,
  setDropdownLoader,
  userType,
  clientId
) => {
  const params = `kyc_type=${userType}&kyc_step=step1&client_id=${clientId}`;
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

const ClientUserInfo = ({
  nextStep,
  onFinishFailed,
  getSelectedObj,
  steps1DropDown,
  isStep,
  userType,
  clientId,
  clientFirstName,
  clientLastName,
  isCustomer,
  clientName,
  clientMobileNumber,
}) => {
  const { connectWithApi } = useInsideAuthApi();

  const [countries, setCountries] = useState([]);

  const [maritalStatus, setMaritalStatus] = useState();
  const [gender, setGender] = useState();

  const [phoneNumber, setPhoneNumber] = useState(clientMobileNumber);

  const [isCountryActive, setCountryActive] = useState(true);
  const [countryCode, setCountryCode] = useState("in");

  const [isValidCitizenship, setIsValidCitizenship] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(false);
  const [userProfileDataId, setUserProfileDataId] = useState();
  const [dropdownLoader, setDropdownLoader] = useState(true);

  const [infoModalVisible, setInfoModalVisible] = useState(false);

  const [form] = Form.useForm();

  const updatedData = {
    phone_number: phoneNumber,
  };
  initialValues = {
    ...initialValues,
    ...updatedData,
  };

  const fullName = {
    first_name: clientFirstName,
    last_name: clientLastName,
  };

  initialValues = { ...initialValues, ...fullName };

  const [pincode, setPincode] = useState([]);

  const [countryCode3, setCountryCode3] = useState("IND");
  const [userProfileData, setUserProfileData] = useState();

  useEffect(() => {
    scrollToTop();
    getKycData(
      connectWithApi,
      setIsData,
      setUserProfileData,
      setUserProfileDataId,
      setPhoneNumber,
      setDropdownLoader,
      userType,
      clientId
    );
    getCountryList(connectWithApi, setCountries);
  }, []);

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
    if (isStep) {
      setMaritalStatus(steps1DropDown?.marital_status);
      setGender(steps1DropDown?.gender);
    }
  }, [isStep]);

  const infoModalHandleOK = () => setInfoModalVisible(false);

  const addressChangedHandler = (value) =>
    addressChangedEvent(
      value,
      setCountryActive,
      setCountryCode3,
      countries,
      form
    );

  const citizenshipChangedHandler = (value) =>
    citizenshipChangedEvent(
      value,
      countries,
      setIsValidCitizenship,
      openInfoModal,
      setInfoModalVisible,
      setCountryCode
    );

  const inputChangedHandler = (phoneNum, country, e, formattedValue) => {
    form.setFieldsValue({
      phone_number: formattedValue,
    });
    setPhoneNumber(formattedValue);
  };

  const basicInforProps = {
    form: form,
    countries: countries,
    countryCode: countryCode,
    initialValues: initialValues,
    citizenshipChangedHandler: citizenshipChangedHandler,
    inputChangedHandler: inputChangedHandler,
    userProfileData: userProfileData,
    phoneNumber: phoneNumber,
    usTacResidentEvent: usTacResidentEvent,
    maritalStatus: maritalStatus,
    gender: gender,
    isCustomer: isCustomer,
    isMobileNumberVerified: true,
  };

  const autoPopulateStateCity = (val, key) =>
    populateStateCity(val, key, initialValues, form);

  const submitUserForm = (values) => {
    setIsLoading(true);
    let address2;
    let payload = {
      kyc_step: "step1",
      kyc_type: userType,
      client_id: clientId,
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
    if (isCountryActive && isValidCitizenship) {
      if (_.isEqual(apiPayload, payload)) {
        setIsLoading(false);
        nextStep();
      } else {
        if (isData) {
          const params = `${userProfileDataId}?client_id=${clientId}`;
          updateKycData(
            connectWithApi,
            payload,
            setIsLoading,
            nextStep,
            params
          );
        } else {
          storeKycData(connectWithApi, payload, setIsLoading, nextStep);
        }
      }
    } else {
      setIsLoading(false);
    }
  };

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
          <ClientName name={clientName} />
          <Title className="client-kyc" title="Basic Information" />
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
            userProfileData={userProfileData}
            isCountryActive={isCountryActive}
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

export default ClientUserInfo;
