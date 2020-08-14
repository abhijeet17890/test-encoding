import React, { useState, useEffect } from "react";
import { Steps, Row, Col } from "antd";
import { useLocation } from "react-router-dom";

import { useInsideAuthApi } from "../../../contextProviders/apiProvider";
import {
  getDropdownValue,
  getDropdownName,
  getSelectedObj,
  onFinishFailed,
} from "../../../utils/dataManipulation";

import Notification from "../../../sharedComponents/Notification";
import Loader from "../../../sharedComponents/Loader";

import StepsComponent from "../../../sharedComponents/steps";

import ClientInvestment from "./clientInvestment";
import ClientEmploymentDetails from "./clientEmploymentDetails";
import ClientUserInfo from "./clientUserInfo";
import ClientDocumentUpload from "./clientDocumentUpload";

import {
  nextStep,
  backStep,
} from "../../../sharedComponents/steps/stepRedirection";

import { getCustomerKycDropdowns } from "../customerKycDropdowns";

const getKycData = (
  connectWithApi,
  setCurrentStep,
  setKycLoader,
  userType,
  clientId
) => {
  const params = `kyc_type=${userType}&client_id=${clientId}`;
  connectWithApi()
    .getKycData(params)
    .then((res) => {
      if (res.data) {
        const kycData = res.data;
        setCurrentStep(kycData.length);
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
  const location = useLocation();

  const userType = "Customer";

  const [currentStep, setCurrentStep] = useState(0);
  const [kycLoader, setKycLoader] = useState(true);
  const [current, setCurrent] = useState(0);

  const [isStep, setIsStep] = useState(false);
  const [steps1DropDown, setSteps1DropDown] = useState(null);
  const [steps2DropDown, setSteps2DropDown] = useState(null);
  const [steps3DropDown, setSteps3DropDown] = useState(null);
  const [steps4DropDown, setSteps4DropDown] = useState(null);

  const clientId = location.state && location.state.clientId;
  const clientFirstName = location.state && location.state.clientFirstName;
  const clientLastName = location.state && location.state.clientLastName;
  const clientName = location.state && location.state.clientName;
  const clientMobileNumber =
    location.state && location.state.clientMobileNumber;

  const steps = [
    {
      title: "01",
      content: (
        <ClientUserInfo
          nextStep={() => nextStep(setCurrent, current)}
          onFinishFailed={() => onFinishFailed("ant-form-item-has-error")}
          getSelectedObj={getSelectedObj}
          steps1DropDown={steps1DropDown}
          isStep={isStep}
          userType={userType}
          isCustomer={false}
          clientFirstName={clientFirstName}
          clientLastName={clientLastName}
          clientId={clientId}
          clientName={clientName}
          clientMobileNumber={clientMobileNumber}
        />
      ),
    },
    {
      title: "02",
      content: (
        <ClientEmploymentDetails
          nextStep={() => nextStep(setCurrent, current)}
          backStep={() => backStep(setCurrent, current)}
          onFinishFailed={() => onFinishFailed("ant-form-item-has-error")}
          getSelectedObj={getSelectedObj}
          steps2DropDown={steps2DropDown}
          isStep={isStep}
          userType={userType}
          clientFirstName={clientFirstName}
          clientLastName={clientLastName}
          clientId={clientId}
          clientName={clientName}
        />
      ),
    },
    {
      title: "03",
      content: (
        <ClientInvestment
          nextStep={() => nextStep(setCurrent, current)}
          backStep={() => backStep(setCurrent, current)}
          onFinishFailed={() => onFinishFailed("ant-form-item-has-error")}
          getSelectedObj={getSelectedObj}
          steps3DropDown={steps3DropDown}
          getDropdownValue={getDropdownValue}
          getDropdownName={getDropdownName}
          isStep={isStep}
          userType={userType}
          clientFirstName={clientFirstName}
          clientLastName={clientLastName}
          clientId={clientId}
          clientName={clientName}
        />
      ),
    },
    {
      title: "04",
      content: (
        <ClientDocumentUpload
          nextStep={() => nextStep(setCurrent, current)}
          backStep={() => backStep(setCurrent, current)}
          onFinishFailed={() => onFinishFailed("error-message-redirection")}
          steps4DropDown={steps4DropDown}
          isStep={isStep}
          clientId={clientId}
          clientName={clientName}
          userType={userType}
        />
      ),
    },
  ];

  useEffect(() => {
    getKycData(
      connectWithApi,
      setCurrentStep,
      setKycLoader,
      userType,
      clientId
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
