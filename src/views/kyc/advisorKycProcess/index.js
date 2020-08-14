import React, { useState, useEffect } from "react";
import { Steps, Row, Col } from "antd";

import { useInsideAuthApi } from "../../../contextProviders/apiProvider";
import { useAuth } from "../../../contextProviders/authProvider";
import {
  getUserType,
  getSelectedObj,
  getSelectedAdvObj,
  getSelectedAdvCountryObj,
  formateName,
  onFinishFailed
} from "../../../utils/dataManipulation";

import Notification from "../../../sharedComponents/Notification";
import Loader from "../../../sharedComponents/Loader";

import {
  nextStep,
  backStep,
} from "../../../sharedComponents/steps/stepRedirection";

import AdvisorKycInfo from "./advisorInfo";
import BussinessDetails from "./businessDetails";
import DocumentUpload from "./documentUpload";
import BankDetails from "./bankDetails";

const getKycData = (
  connectWithApi,
  setCurrentStep,
  setAdvisorLoader,
  setAdvisorType,
  setCertificateType,
  userType
) => {
  const params = `kyc_type=${userType}`;
  connectWithApi()
    .getKycData(params)
    .then((res) => {
      if (res.data) {
        const kycData = res.data;
        if (kycData.length == 4) {
          setCurrentStep(kycData.length - 1);
        } else {
          setCurrentStep(kycData.length);
        }
        kycData.map((value) => {
          if (value.kyc_step === "step1") {
            setAdvisorType(formateName(value.information.advisor_type.name));
          }
          if (value.kyc_step === "step2") {
            value.information.sebi_registered_investment_advisor
              ? setCertificateType("sebi")
              : setCertificateType("amfi");
          }
        });
      } else {
        setCurrentStep(0);
      }
      setAdvisorLoader(false);
    })
    .catch((error) => {
      setAdvisorLoader(false);
      Notification({ type: "error", content: error.message });
    });
};

const getAdvisorAllGlobaliseCountries = (
  connectWithApi,
  setAdvisorAllGlobaliseCountries
) => {
  connectWithApi()
    .getAdvisorAllGlobaliseCountries("ordering=name")
    .then((res) => {
      if (res.data) {
        setAdvisorAllGlobaliseCountries(res.data);
      }
    })
    .catch((error) => {
      Notification({ type: "error", content: error.message });
    });
};

const getAdvisorDropdowns = (connectWithApi, setAdvisorDropdownsStep1) => {
  connectWithApi()
    .getAdvisorDropdowns()
    .then((res) => {
      res.step1
        ? setAdvisorDropdownsStep1(res.step1)
        : setAdvisorDropdownsStep1([]);
    })
    .catch((error) => {
      Notification({ type: "error", content: error.message });
    });
};

const AdvisorKycProcess = () => {
  const { Step } = Steps;

  const { connectWithApi } = useInsideAuthApi();
  const { loggedInUser } = useAuth();

  const userType = getUserType(loggedInUser);

  const [currentStep, setCurrentStep] = useState(0);
  const [current, setCurrent] = useState(0);
  const [selectedAdvisorType, setSelectedAdvisorType] = useState();

  const [
    advisorAllGlobaliseCountries,
    setAdvisorAllGlobaliseCountries,
  ] = useState([]);
  const [advisorLoader, setAdvisorLoader] = useState(true);

  const [advisorDropdownsStep1, setAdvisorDropdownsStep1] = useState([]);
  const [certificateValue, setCertificateValue] = useState("amfi");

  const setAdvisorType = (type) => setSelectedAdvisorType(type);

  const certificateChangedHandler = (event) =>
    setCertificateValue(event.target.value);

  const setCertificateType = (value) => setCertificateValue(value);

  useEffect(() => {
    getKycData(
      connectWithApi,
      setCurrentStep,
      setAdvisorLoader,
      setAdvisorType,
      setCertificateType,
      userType
    );
    getAdvisorAllGlobaliseCountries(
      connectWithApi,
      setAdvisorAllGlobaliseCountries
    );
    getAdvisorDropdowns(connectWithApi, setAdvisorDropdownsStep1);
  }, []);

  useEffect(() => {
    setCurrent(currentStep);
  }, [currentStep]);

  const steps = [
    {
      title: "01",
      content: (
        <AdvisorKycInfo
          advisorAllGlobaliseCountries={advisorAllGlobaliseCountries}
          advisorDropdownsStep1={advisorDropdownsStep1}
          nextStep={() => nextStep(setCurrent, current)}
          onFinishFailed={() => onFinishFailed("ant-form-item-has-error")}
          userType={userType}
          getSelectedObj={getSelectedObj}
          getSelectedAdvObj={getSelectedAdvObj}
          getSelectedAdvCountryObj={getSelectedAdvCountryObj}
          setAdvisorType={setAdvisorType}
        />
      ),
    },
    {
      title: "02",
      content: (
        <BussinessDetails
          nextStep={() => nextStep(setCurrent, current)}
          backStep={() => backStep(setCurrent, current)}
          onFinishFailed={() => onFinishFailed("ant-form-item-has-error")}
          userType={userType}
          getSelectedObj={getSelectedObj}
          selectedAdvisorType={selectedAdvisorType}
          certificateValue={certificateValue}
          certificateChangedHandler={certificateChangedHandler}
          setCertificateType={setCertificateType}
        />
      ),
    },
    {
      title: "03",
      content: (
        <DocumentUpload
          nextStep={() => nextStep(setCurrent, current)}
          backStep={() => backStep(setCurrent, current)}
          onFinishFailed={() => onFinishFailed("ant-form-item-has-error")}
          userType={userType}
          selectedAdvisorType={selectedAdvisorType}
          certificateValue={certificateValue}
        />
      ),
    },
    {
      title: "04",
      content: (
        <BankDetails
          backStep={() => backStep(setCurrent, current)}
          onFinishFailed={() => onFinishFailed("ant-form-item-has-error")}
          userType={userType}
          getSelectedObj={getSelectedObj}
        />
      ),
    },
  ];
  return (
    <React.Fragment>
      {advisorLoader ? (
        <Row justify="center">
          <Col>
            <Loader size="large" spinning={advisorLoader} />
          </Col>
        </Row>
      ) : (
        <Row justify="center">
          <Col span={22}>
            <Row justify="center">
              <Col xs={{ span: 22 }} lg={{ span: 23 }}>
                {steps[current]?.content}
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};

export default AdvisorKycProcess;
