import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "antd";

import { useInsideAuthApi } from "../../../../contextProviders/apiProvider";
import Notification from "../../../../sharedComponents/Notification";
import Loader from "../../../../sharedComponents/Loader";

import { Button } from "../../../../sharedComponents/button";

import Title from "./title";
import UploadFiles from "./uploadFiles";

import {
  FloatRightButtonCol,
  StyledButtonContainer,
} from "../../sharedComponents/style";

const getKycData = (
  connectWithApi,
  setIsData,
  setDocumentUploadId,
  userType,
  setDocumentUploadLoader
) => {
  const params = `kyc_type=${userType}&kyc_step=step3`;
  connectWithApi()
    .getKycData(params)
    .then((res) => {
      const response = res.data;
      if (response.length) {
        setIsData(true);
        setDocumentUploadId(response[0].id);
      } else {
        setIsData(false);
      }
      setDocumentUploadLoader(false);
    })
    .catch((error) => {
      setDocumentUploadLoader(false);
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
  documentUploadId,
  nextStep
) => {
  connectWithApi()
    .updateKycData(payload, documentUploadId)
    .then((res) => {
      setIsLoading(false);
      nextStep();
    })
    .catch((error) => {
      setIsLoading(false);
      Notification({ type: "error", content: error.message });
    });
};

const DocumentUpload = ({
  backStep,
  nextStep,
  selectedAdvisorType,
  certificateValue,
  userType,
}) => {
  const { connectWithApi } = useInsideAuthApi();
  const [form] = Form.useForm();

  const [isData, setIsData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [documentUploadId, setDocumentUploadId] = useState();
  const [documentUploadLoader, setDocumentUploadLoader] = useState(true);

  useEffect(() => {
    getKycData(
      connectWithApi,
      setIsData,
      setDocumentUploadId,
      userType,
      setDocumentUploadLoader
    );
  }, []);

  const submitUserForm = (values) => {
    const payload = {
      kyc_step: "step3",
      kyc_type: userType,
      information: {
        documents_uploaded: true,
      },
    };

    if (isData) {
      updateKycData(
        connectWithApi,
        payload,
        setIsLoading,
        documentUploadId,
        nextStep
      );
    } else {
      storeKycData(connectWithApi, payload, setIsLoading, nextStep);
    }
  };

  return (
    <React.Fragment>
      {documentUploadLoader ? (
        <Row justify="center">
          <Col>
            <Loader size="large" spinning={documentUploadLoader} />
          </Col>
        </Row>
      ) : (
        <Form
          layout="vertical"
          onFinish={submitUserForm}
          hideRequiredMark
          form={form}
        >
          <Row justify="center">
            <Col span={18}>
              <Title />
              <Row justify="center">
                <Col span={24}>
                  <UploadFiles
                    selectedAdvisorType={selectedAdvisorType}
                    certificateValue={certificateValue}
                  />
                  <StyledButtonContainer>
                    <FloatRightButtonCol span={12}>
                      <Button size="md-1" outlined={true} onClick={backStep}>
                        Back
                      </Button>
                    </FloatRightButtonCol>
                    <Col span={11}>
                      <Button
                        isLoading={isLoading}
                        htmlType="submit"
                        size="md-1"
                      >
                        Next
                      </Button>
                    </Col>
                  </StyledButtonContainer>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      )}
    </React.Fragment>
  );
};

export default DocumentUpload;
