import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "antd";
import _ from "underscore";

import { useInsideAuthApi } from "../../../contextProviders/apiProvider";

import Divider from "../../../sharedComponents/Divider";
import { Button } from "../../../sharedComponents/button";
import Loader from "../../../sharedComponents/Loader";

import Title from "../customerKycForm/title";
import ClientName from "./clientName";
import EmpForm from "../customerKycForm/employmentForm/empForm";
import {
  SelfEmployed,
  Employed,
  getEmployedPayload,
  storeKycData,
  getKycData,
  updateKycData
} from "../customerKycForm/employmentForm/employee";

import { FloatRightButtonCol } from "../sharedComponents/style";
import { StyledButtonContainer } from "../sharedComponents/style";

let initialValues = {};

const ClientEmploymentDetails = ({
  backStep,
  nextStep,
  onFinishFailed,
  steps2DropDown,
  isStep,
  getSelectedObj,
  userType,
  clientName,
  clientId,
}) => {
  const [form] = Form.useForm();
  const { connectWithApi } = useInsideAuthApi();

  const [tradedCompany, setTradedCompany] = useState(false);
  const [isTradedCompanySwitch, setIsTradedCompanySwitch] = useState(false);

  const [affiliated, setAffiliated] = useState(false);
  const [isAffiliatedSwitch, setIsAffiliatedSwitch] = useState(false);
  const [officialInfo, setOfficialInfo] = useState(false);
  const [isOfficialInfoSwitch, setIsOfficialInfoSwitch] = useState(false);

  const [industry, setIndustry] = useState([]);
  const [position, setPosition] = useState([]);
  const [employeeStatus, setEmployeeStatus] = useState([]);

  const [isEmployed, setEmployed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [empDetailsData, setEmpDetailsData] = useState();
  const [empDetailsDataId, setEmpDetailsDataId] = useState();
  const [dropdownLoader, setDropdownLoader] = useState(true);
  const [isData, setIsData] = useState(false);
  const [apiPayload, setApiPayload] = useState();

  const affiliatedChangedHandler = (checked) => {
    setIsAffiliatedSwitch(checked);
    checked ? setAffiliated(true) : setAffiliated(false);
  };

  const tradedCompanyChangedHandler = (checked) => {
    setIsTradedCompanySwitch(checked);
    checked ? setTradedCompany(true) : setTradedCompany(false);
  };

  const officialInfoChangedHandler = (checked) => {
    setIsOfficialInfoSwitch(checked);
    checked ? setOfficialInfo(true) : setOfficialInfo(false);
  };

  const employeeStatusChangedHandler = (value) => {
    if (value === Employed || value === SelfEmployed) {
      setEmployed(true);
    } else {
      setEmployed(false);
    }
  };

  useEffect(() => {
    const params = `kyc_type=${userType}&kyc_step=step2&client_id=${clientId}`;
    getKycData(
      connectWithApi,
      setIsData,
      setEmpDetailsData,
      setEmpDetailsDataId,
      setAffiliated,
      setTradedCompany,
      setOfficialInfo,
      setIsAffiliatedSwitch,
      setIsTradedCompanySwitch,
      setIsOfficialInfoSwitch,
      setEmployed,
      setDropdownLoader,
      userType,
      params,
      setApiPayload
    );
  }, [isData]);

  useEffect(() => {
    if (isStep) {
      setIndustry(steps2DropDown?.industry);
      setPosition(steps2DropDown?.position);
      setEmployeeStatus(steps2DropDown?.employment_status);
    }
  }, [isStep]);

  const submitEmploymentDetailsForm = (values) => {
    setIsLoading(true);
    let payload = getEmployedPayload(
      values,
      getSelectedObj,
      employeeStatus,
      industry,
      position,
      userType,
      affiliated,
      tradedCompany,
      officialInfo
    );
    const id = { client_id: clientId };
    payload = { ...payload, ...id };
    const apiResponse = { ...apiPayload, ...id };
    
    if (_.isEqual(apiResponse, payload)) {
      setIsLoading(false);
      nextStep();
    } else {
      if (isData) {
        const params = `${empDetailsDataId}?client_id=${clientId}`;
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
  };

  return (
    <React.Fragment>
      <Form
        layout="vertical"
        onFinish={submitEmploymentDetailsForm}
        initialValues={initialValues}
        onFinishFailed={onFinishFailed}
        hideRequiredMark
        form={form}
      >
        {dropdownLoader ? (
          <Row justify="center">
            <Col>
              <Loader size="large" spinning={dropdownLoader} />
            </Col>
          </Row>
        ) : (
          <React.Fragment>
            <ClientName name={clientName} />
            <Title className="client-kyc" title="Employment Details" />
            <EmpForm
              empDetailsData={empDetailsData}
              employeeStatusChangedHandler={employeeStatusChangedHandler}
              isEmployed={isEmployed}
              industry={industry}
              position={position}
              employeeStatus={employeeStatus}
              officialInfoChangedHandler={officialInfoChangedHandler}
              isOfficialInfoSwitch={isOfficialInfoSwitch}
              officialInfo={officialInfo}
              affiliatedChangedHandler={affiliatedChangedHandler}
              isAffiliatedSwitch={isAffiliatedSwitch}
              affiliated={affiliated}
              tradedCompanyChangedHandler={tradedCompanyChangedHandler}
              isTradedCompanySwitch={isTradedCompanySwitch}
              tradedCompany={tradedCompany}
              form={form}
              initialValues={initialValues}
            />
            <React.Fragment>
              <Divider />
              <StyledButtonContainer justify="center">
                <FloatRightButtonCol span={12}>
                  <Button size="md-1" outlined={true} onClick={backStep}>
                    Back
                  </Button>
                </FloatRightButtonCol>
                <Col span={11}>
                  <Button loading={isLoading} htmlType="submit" size="md-1">
                    Next
                  </Button>
                </Col>
              </StyledButtonContainer>
            </React.Fragment>
          </React.Fragment>
        )}
      </Form>
    </React.Fragment>
  );
};

export default ClientEmploymentDetails;
