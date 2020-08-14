import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "antd";

import { useHistory, useLocation } from "react-router-dom";

import { routes } from "../../../../constants/routes";

import { useInsideAuthApi } from "../../../../contextProviders/apiProvider";
import { useAuth } from "../../../../contextProviders/authProvider";
import Notification from "../../../../sharedComponents/Notification";
import Loader from "../../../../sharedComponents/Loader";
import { Button } from "../../../../sharedComponents/button";

import BankDetailsTitle from "./title";
import BankDetailsForm from "./bankDetailForm";

import {
  FloatRightButtonCol,
  StyledButtonContainer,
} from "../../sharedComponents/style";

let initialValues = {};
let apiPayload = {};

const getKycData = (
  connectWithApi,
  setBankDetail,
  userType,
  setBankDetailFormLoader
) => {
  const params = `kyc_type=${userType}&kyc_step=step4`;
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
        setBankDetail(kycData);
      }
      setBankDetailFormLoader(false);
    })
    .catch((error) => {
      setBankDetailFormLoader(false);
      Notification({ type: "error", content: error.message });
    });
};

const storeKycData = (
  connectWithApi,
  payload,
  setIsLoading,
  history,
  updateLoggedInUserInfo
) => {
  connectWithApi()
    .submitAdvisorKycDetails(payload)
    .then((res) => {
      setIsLoading(false);
      updateLoggedInUserInfo({
        advisor_transition_info: {
          kyc_submitted: true,
          kyc_status: "PENDING",
        },
      });
      history.push(routes.authRoutes.kycThankYou + "/advisor");
    })
    .catch((error) => {
      setIsLoading(false);
      Notification({ type: "error", content: error.message });
    });
};

const BankDetails = ({ onFinishFailed, backStep, userType }) => {
  const { connectWithApi } = useInsideAuthApi();
  const { updateLoggedInUserInfo } = useAuth();

  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();

  const isDisclosureAgree = location.state
    ? location.state.disclosureAgree
    : false;

  const [isChecked, setIsChecked] = useState(isDisclosureAgree);
  const [isLoading, setIsLoading] = useState(false);
  const [bankDetail, setBankDetail] = useState([]);
  const [bankDetailFormLoader, setBankDetailFormLoader] = useState(true);

  const [showErrorMessage, setShowErrorMessage] = useState(true);

  const changedHandler = (event) => setIsChecked(event.target.checked);

  useEffect(() => {
    getKycData(
      connectWithApi,
      setBankDetail,
      userType,
      setBankDetailFormLoader
    );
  }, []);

  const submitUserForm = (values) => {
    const payload = {
      kyc_step: "step4",
      kyc_type: userType,
      information: {
        account_holder_name: values.account_holder_name,
        bank_name: values.bank_name,
        account_number: values.account_number,
        ifsc_code: values.ifsc_code,
      },
    };
    if (isChecked) {
      setIsLoading(true);
      storeKycData(
        connectWithApi,
        payload,
        setIsLoading,
        history,
        updateLoggedInUserInfo
      );
    } else {
      setShowErrorMessage(false);
    }
  };

  return (
    <React.Fragment>
      {bankDetailFormLoader ? (
        <Row justify="center">
          <Col>
            <Loader size="large" spinning={bankDetailFormLoader} />
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
          <BankDetailsTitle />
          <BankDetailsForm
            isChecked={isChecked}
            showErrorMessage={showErrorMessage}
            changedHandler={changedHandler}
            bankDetail={bankDetail}
            form={form}
          />
          <StyledButtonContainer>
            <FloatRightButtonCol span={12}>
              <Button size="md-1" outlined={true} onClick={backStep}>
                Back
              </Button>
            </FloatRightButtonCol>
            <Col span={11}>
              <Button loading={isLoading} htmlType="submit" size="md-1">
                Submit
              </Button>
            </Col>
          </StyledButtonContainer>
        </Form>
      )}
    </React.Fragment>
  );
};
export default BankDetails;
