import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "antd";
import _ from "underscore";

import { useInsideAuthApi } from "../../../../contextProviders/apiProvider";
import { getApiDate } from "../../../../utils/dataManipulation";

import Notification from "../../../../sharedComponents/Notification";
import Loader from "../../../../sharedComponents/Loader";
import { Button } from "../../../../sharedComponents/button";

import Title from "./title";
import RegistrationDetailsTitle from "./registrationDetailsTitle";
import CertificationDetailTitle from "./certificationDetailTitle";
import RegistrationDetailForm from "./registrationDetailForm";
import CertificationDetailForm from "./certificationDetailForm";

import {
  FloatRightButtonCol,
  StyledButtonContainer,
} from "../../sharedComponents/style";

let initialValues = {};
let apiPayload = {};

const getKycData = (
  connectWithApi,
  setIsData,
  setBusinessDetail,
  setBusinessDetailId,
  userType,
  setBusinessDetailFormLoader,
  setCertificateType
) => {
  const params = `kyc_type=${userType}&kyc_step=step2`;
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
        setBusinessDetail(kycData);
        setBusinessDetailId(response[0].id);
        response[0].information.sebi_registered_investment_advisor
          ? setCertificateType("sebi")
          : setCertificateType("amfi");
      } else {
        setIsData(false);
      }
      setBusinessDetailFormLoader(false);
    })
    .catch((error) => {
      setBusinessDetailFormLoader(false);
      Notification({ type: "error", content: error.message });
    });
};

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
  businessDetailId
) => {
  connectWithApi()
    .updateKycData(payload, businessDetailId)
    .then((res) => {
      setIsLoading(false);
      nextStep();
    })
    .catch((error) => {
      setIsLoading(false);
      Notification({ type: "error", content: error.message });
    });
};

const BussinessDetails = ({
  onFinishFailed,
  backStep,
  nextStep,
  selectedAdvisorType,
  userType,
  certificateValue,
  certificateChangedHandler,
  setCertificateType,
}) => {
  const { connectWithApi } = useInsideAuthApi();
  const [form] = Form.useForm();

  const [isData, setIsData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [businessDetail, setBusinessDetail] = useState([]);
  const [businessDetailId, setBusinessDetailId] = useState();
  const [businessDetailFormLoader, setBusinessDetailFormLoader] = useState(
    true
  );

  useEffect(() => {
    getKycData(
      connectWithApi,
      setIsData,
      setBusinessDetail,
      setBusinessDetailId,
      userType,
      setBusinessDetailFormLoader,
      setCertificateType
    );
  }, []);

  const submitUserForm = (values) => {
    setIsLoading(true);
    let dateOfIncorporationDate;
    let aadhaarNumber;
    let payload = {
      kyc_step: "step2",
      kyc_type: userType,
      information: {
        pan_number: values.pan_number,
        gst_registration_number: values.gst_registration_number,
        sebi_registered_investment_advisor:
          certificateValue === "amfi" ? false : true,
        certification_registration_number:
          certificateValue === "amfi"
            ? values.amfi_certification_registration_number
            : values.sebi_certification_registration_number,
        date_of_registration:
          certificateValue === "amfi"
            ? getApiDate(values.amfi_date_of_registration)
            : getApiDate(values.sebi_date_of_registration),
        date_of_expiry:
          certificateValue === "amfi"
            ? getApiDate(values.amfi_date_of_expiry)
            : getApiDate(values.sebi_date_of_expiry),
      },
    };
    if (values.date_of_incorporation) {
      dateOfIncorporationDate = {
        date_of_incorporation: getApiDate(values.date_of_incorporation),
      };
      payload.information = {
        ...payload.information,
        ...dateOfIncorporationDate,
      };
    }
    if (values.aadhaar_number) {
      aadhaarNumber = {
        aadhaar_number: values.aadhaar_number,
      };
      payload.information = { ...payload.information, ...aadhaarNumber };
    }
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
          businessDetailId
        );
      } else {
        storeKycData(connectWithApi, payload, setIsLoading, nextStep);
      }
    }
  };

  return (
    <React.Fragment>
      {businessDetailFormLoader ? (
        <Row justify="center">
          <Col>
            <Loader size="large" spinning={businessDetailFormLoader} />
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
          <Title />
          <RegistrationDetailsTitle />
          <RegistrationDetailForm
            selectedAdvisorType={selectedAdvisorType}
            businessDetail={businessDetail}
            form={form}
          />
          <CertificationDetailTitle />
          <CertificationDetailForm
            certificateValue={certificateValue}
            certificateChangedHandler={certificateChangedHandler}
            businessDetail={businessDetail}
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
                Next
              </Button>
            </Col>
          </StyledButtonContainer>
        </Form>
      )}
    </React.Fragment>
  );
};

export default BussinessDetails;
