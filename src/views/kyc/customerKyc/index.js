import React, { useState, useEffect } from "react";
import { Steps, Row, Col } from "antd";

import { useInsideAuthApi } from "../../../contextProviders/apiProvider";
import { useAuth } from "../../../contextProviders/authProvider";
import {
  getUserType,
  getDropdownValue,
  getDropdownName,
  getSelectedObj,
  onFinishFailed
} from "../../../utils/dataManipulation";

import Notification from "../../../sharedComponents/Notification";
import Loader from "../../../sharedComponents/Loader";

import StepsComponent from "../../../sharedComponents/steps";

import UserInfo from "./userInfo";
import EmploymentDetails from "./employmentDetails";
import InvestmentProfileDetails from "./investmentProfile";
import CustomerDocumentUpload from "./documentUpload";

import { getCustomerKycDropdowns } from "../customerKycDropdowns";

import {
  nextStep,
  backStep,
} from "../../../sharedComponents/steps/stepRedirection";

const getKycData = (
  connectWithApi,
  setCurrentStep,
  setKycLoader,
  updateFirstName,
  updateLastName,
  userType,
  loggedInUser
) => {
  const params = `kyc_type=${userType}`;
  connectWithApi()
    .getKycData(params)
    .then((res) => {
      if (res.data) {
        const kycData = res.data;
        const personalDetails = loggedInUser.personal_details;
        let phoneNumber;
        phoneNumber = personalDetails?.phone_number;

        kycData.map((value) => {
          if (value.kyc_step === "step1") {
            updateFirstName(value.information.first_name);
            updateLastName(value.information.last_name);
            if (phoneNumber === value.information.phonenumber) {
              setCurrentStep(kycData.length);
            } else {
              setCurrentStep(0);
            }
          }
        });
      } else {
        setCurrentStep(0);
      }
      setKycLoader(false);
    })
    .catch((error) => {
      setKycLoader(false);
      Notification({ type: "error", content: error.message });
    });
};

const KycProcess = () => {
  const { Step } = Steps;

  const { connectWithApi } = useInsideAuthApi();
  const { loggedInUser } = useAuth();

  const userType = getUserType(loggedInUser);

  const [currentStep, setCurrentStep] = useState(0);
  const [current, setCurrent] = useState(0);
  const [kycLoader, setKycLoader] = useState(true);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const [isStep, setIsStep] = useState(false);
  const [steps1DropDown, setSteps1DropDown] = useState(null);
  const [steps2DropDown, setSteps2DropDown] = useState(null);
  const [steps3DropDown, setSteps3DropDown] = useState(null);
  const [steps4DropDown, setSteps4DropDown] = useState(null);

  const updateFirstName = (val) => setFirstName(val);
  const updateLastName = (val) => setLastName(val);

  useEffect(() => {
    getKycData(
      connectWithApi,
      setCurrentStep,
      setKycLoader,
      updateFirstName,
      updateLastName,
      userType,
      loggedInUser
    );
    getCustomerKycDropdowns(
      connectWithApi,
      setSteps1DropDown,
      setSteps2DropDown,
      setSteps3DropDown,
      setSteps4DropDown,
      setIsStep
    );
  }, []);

  useEffect(() => {
    setCurrent(currentStep);
  }, [currentStep]);

  const steps = [
    {
      title: "01",
      content: (
        <UserInfo
          nextStep={() => nextStep(setCurrent, current)}
          onFinishFailed={() => onFinishFailed("ant-form-item-has-error")}
          getSelectedObj={getSelectedObj}
          steps1DropDown={steps1DropDown}
          isStep={isStep}
          userType={userType}
          updateFirstName={updateFirstName}
          updateLastName={updateLastName}
          isCustomer={true}
        />
      ),
    },
    {
      title: "02",
      content: (
        <EmploymentDetails
          nextStep={() => nextStep(setCurrent, current)}
          backStep={() => backStep(setCurrent, current)}
          onFinishFailed={() => onFinishFailed("ant-form-item-has-error")}
          getSelectedObj={getSelectedObj}
          steps2DropDown={steps2DropDown}
          isStep={isStep}
          userType={userType}
        />
      ),
    },
    {
      title: "03",
      content: (
        <InvestmentProfileDetails
          nextStep={() => nextStep(setCurrent, current)}
          backStep={() => backStep(setCurrent, current)}
          onFinishFailed={() => onFinishFailed("ant-form-item-has-error")}
          getSelectedObj={getSelectedObj}
          steps3DropDown={steps3DropDown}
          getDropdownValue={getDropdownValue}
          getDropdownName={getDropdownName}
          isStep={isStep}
          userType={userType}
        />
      ),
    },
    {
      title: "04",
      content: (
        <CustomerDocumentUpload
          nextStep={() => nextStep(setCurrent, current)}
          backStep={() => backStep(setCurrent, current)}
          onFinishFailed={() => onFinishFailed("error-message-redirection")}
          steps4DropDown={steps4DropDown}
          isStep={isStep}
          firstName={firstName}
          lastName={lastName}
        />
      ),
    },
  ];

  return (
    <React.Fragment>
      {kycLoader ? (
        <Row justify="center">
          <Col>
            <Loader size="large" spinning={kycLoader} />
          </Col>
        </Row>
      ) : (
        <StepsComponent steps={steps} current={current} Step={Step} />
      )}
    </React.Fragment>
  );
};

export default KycProcess;
