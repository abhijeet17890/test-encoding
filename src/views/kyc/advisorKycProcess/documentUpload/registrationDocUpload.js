import React, { useState, useEffect } from "react";
import { Row, Upload, Col, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useInsideAuthApi } from "../../../../contextProviders/apiProvider";

import { Button } from "../../../../sharedComponents/button";
import Divider from "../../../../sharedComponents/Divider";

import ImageUpload from "../../sharedComponents/imageUpload";

import { StyledDocumentComponent, StyleDocumentUploadButton } from "../style";
import { StyledLoader } from "../../sharedComponents/style";

const storeRegistrationKycDocument = (
  connectWithApi,
  formData,
  setRegistrationDoc,
  registrationDoc,
  setRegistrationDocLoader,
  setErrorMessage
) => {
  let updatedList = [];
  connectWithApi()
    .uploadAdvisorKycDocuments(formData)
    .then((res) => {
      if (res.data) {
        const list = {
          name: res.data.name,
          id: res.data.id,
        };

        updatedList = [...registrationDoc, list];
        setRegistrationDoc(updatedList);
      }
      setRegistrationDocLoader(false);
      setErrorMessage("");
    })
    .catch((error) => {
      setErrorMessage(error.message);
      setRegistrationDocLoader(false);
    });
};

const getUploadedKycRegistrationDocument = (
  connectWithApi,
  documentType,
  setRegistrationDoc,
  setRegistrationDocLoader
) => {
  const params = `document_type=${documentType}`;
  connectWithApi()
    .getAdvisorKycDocument(params)
    .then((res) => {
      if (res.data) {
        const result = res.data;
        let newList = [];
        result.map((val) => {
          newList.push({
            name: val.name,
            id: val.id,
          });
        });
        setRegistrationDoc(newList);
      }
      setRegistrationDocLoader(false);
    })
    .catch((error) => {
      setRegistrationDocLoader(false);
    });
};

const deleteAdvisorKycDocument = (connectWithApi, id) => {
  connectWithApi()
    .deleteAdvisorKycDocument(id)
    .then((res) => {})
    .catch((error) => {});
};

const RegistrationDocUpload = ({ certificateValue }) => {
  const { connectWithApi } = useInsideAuthApi();

  const [registrationDoc, setRegistrationDoc] = useState([]);
  const [registrationDocLoader, setRegistrationDocLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const type = certificateValue === "amfi" ? "ARN_CARD" : "SEBI_CARD";

  const registrationImageUpload = {
    async onChange({ file, fileList }) {
      setRegistrationDocLoader(true);
      if (file.status !== "uploading") {
        const formData = new FormData();
        formData.set("document_type", type);
        formData.set("name", file.name);
        formData.append("document", file.originFileObj);
        storeRegistrationKycDocument(
          connectWithApi,
          formData,
          setRegistrationDoc,
          registrationDoc,
          setRegistrationDocLoader,
          setErrorMessage
        );
      }
    },
  };

  useEffect(() => {
    getUploadedKycRegistrationDocument(
      connectWithApi,
      type,
      setRegistrationDoc,
      setRegistrationDocLoader
    );
  }, []);

  const removedRegistrationDoc = (list, id) => {
    deleteAdvisorKycDocument(connectWithApi, id);
    const updatedList = list.filter((val) => id !== val.id);
    setRegistrationDoc(updatedList);
  };

  const antIcon = <LoadingOutlined spin />;

  return (
    <Row justify="center">
      <StyledDocumentComponent span={19} offset={1}>
        {certificateValue === "amfi" ? "ARN Card" : "SEBI Registration Card"}
        {registrationDocLoader ? (
          <StyledLoader>
            <Spin indicator={antIcon} />
            <span className="loading-text">Uploading...</span>
          </StyledLoader>
        ) : null}
      </StyledDocumentComponent>
      <StyleDocumentUploadButton span={4}>
        <Upload
          {...registrationImageUpload}
          accept="image/*,.pdf"
          showUploadList={false}
        >
          <Button size="sm-2" htmlType="button">
            Upload
          </Button>
        </Upload>
      </StyleDocumentUploadButton>

      <Col span={24}>
        {!registrationDocLoader ? (
          <ImageUpload
            list={registrationDoc}
            span={22}
            clicked={removedRegistrationDoc}
            errorMessage={errorMessage}
          />
        ) : null}
      </Col>
      <Divider />
    </Row>
  );
};

export default RegistrationDocUpload;
