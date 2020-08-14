import React, { useState, useEffect } from "react";
import { Row, Upload, Col, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useInsideAuthApi } from "../../../../contextProviders/apiProvider";

import { Button } from "../../../../sharedComponents/button";
import Divider from "../../../../sharedComponents/Divider";

import ImageUpload from "../../sharedComponents/imageUpload";

import { StyledDocumentComponent, StyleDocumentUploadButton } from "../style";
import { StyledLoader } from "../../sharedComponents/style";

const storeIncorporationKycDocument = (
  connectWithApi,
  formData,
  setIncorporationDoc,
  incorporationDoc,
  setIncorporationDocLoader,
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

        updatedList = [...incorporationDoc, list];
        setIncorporationDoc(updatedList);
      }
      setErrorMessage("");
      setIncorporationDocLoader(false);
    })
    .catch((error) => {
      setErrorMessage(error.message);
      setIncorporationDocLoader(false);
    });
};

const getUploadedKycIncorporationDocument = (
  connectWithApi,
  documentType,
  setIncorporationDoc,
  setIncorporationDocLoader
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
        setIncorporationDoc(newList);
      }
      setIncorporationDocLoader(false);
    })
    .catch((error) => {
      setIncorporationDocLoader(false);
    });
};

const deleteAdvisorKycDocument = (connectWithApi, id) => {
  connectWithApi()
    .deleteAdvisorKycDocument(id)
    .then((res) => {})
    .catch((error) => {});
};

const IncorporationDocUpload = () => {
  const { connectWithApi } = useInsideAuthApi();

  const [incorporationDoc, setIncorporationDoc] = useState([]);
  const [incorporationDocLoader, setIncorporationDocLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const incorporationImageUpload = {
    async onChange({ file, fileList }) {
      setIncorporationDocLoader(true);
      if (file.status !== "uploading") {
        const formData = new FormData();
        formData.set("document_type", "INCORPORATION_CERTIFICATE");
        formData.set("name", file.name);
        formData.append("document", file.originFileObj);
        storeIncorporationKycDocument(
          connectWithApi,
          formData,
          setIncorporationDoc,
          incorporationDoc,
          setIncorporationDocLoader,
          setErrorMessage
        );
      }
    },
  };

  useEffect(() => {
    getUploadedKycIncorporationDocument(
      connectWithApi,
      "INCORPORATION_CERTIFICATE",
      setIncorporationDoc,
      setIncorporationDocLoader
    );
  }, []);

  const removedIncorporationDoc = (list, id) => {
    deleteAdvisorKycDocument(connectWithApi, id);
    const updatedList = list.filter((val) => id !== val.id);
    setIncorporationDoc(updatedList);
  };

  const antIcon = <LoadingOutlined spin />;

  return (
    <Row justify="center">
      <StyledDocumentComponent span={19} offset={1}>
        Certificate of Incorporation
        {incorporationDocLoader ? (
          <StyledLoader>
            <Spin indicator={antIcon} />
            <span className="loading-text">Uploading...</span>
          </StyledLoader>
        ) : null}
      </StyledDocumentComponent>
      <StyleDocumentUploadButton span={4}>
        <Upload
          {...incorporationImageUpload}
          accept="image/*,.pdf"
          showUploadList={false}
        >
          <Button size="sm-2" htmlType="button">
            Upload
          </Button>
        </Upload>
      </StyleDocumentUploadButton>

      <Col span={24}>
        {!incorporationDocLoader ? (
          <ImageUpload
            list={incorporationDoc}
            span={22}
            clicked={removedIncorporationDoc}
            errorMessage={errorMessage}
          />
        ) : null}
      </Col>
      <Divider />
    </Row>
  );
};

export default IncorporationDocUpload;
