import React, { useState, useEffect } from "react";
import { Row, Upload, Col, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useInsideAuthApi } from "../../../../contextProviders/apiProvider";

import { Button } from "../../../../sharedComponents/button";
import Divider from "../../../../sharedComponents/Divider";

import ImageUpload from "../../sharedComponents/imageUpload";

import { StyledDocumentComponent, StyleDocumentUploadButton } from "../style";
import { StyledLoader } from "../../sharedComponents/style";

const storePanKycDocument = (
  connectWithApi,
  formData,
  setPanDoc,
  panDoc,
  setPanDocLoader,
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

        updatedList = [...panDoc, list];
        setPanDoc(updatedList);
      }
      setPanDocLoader(false);
      setErrorMessage("");
    })
    .catch((error) => {
      setErrorMessage(error.message);
      setPanDocLoader(false);
    });
};

const getUploadedKycPanDocument = (
  connectWithApi,
  documentType,
  setPanDoc,
  setPanDocLoader
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
        setPanDoc(newList);
      }
      setPanDocLoader(false);
    })
    .catch((error) => {
      setPanDocLoader(false);
    });
};

const deleteAdvisorKycDocument = (connectWithApi, id) => {
  connectWithApi()
    .deleteAdvisorKycDocument(id)
    .then((res) => {})
    .catch((error) => {});
};

const PanUploadFiles = () => {
  const { connectWithApi } = useInsideAuthApi();

  const [panDoc, setPanDoc] = useState([]);
  const [panDocLoader, setPanDocLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const panCardImageUpload = {
    async onChange({ file, fileList }) {
      setPanDocLoader(true);
      if (file.status !== "uploading") {
        const formData = new FormData();
        formData.set("document_type", "PAN_CARD");
        formData.set("name", file.name);
        formData.append("document", file.originFileObj);
        storePanKycDocument(
          connectWithApi,
          formData,
          setPanDoc,
          panDoc,
          setPanDocLoader,
          setErrorMessage
        );
      }
    },
  };

  useEffect(() => {
    getUploadedKycPanDocument(
      connectWithApi,
      "PAN_CARD",
      setPanDoc,
      setPanDocLoader
    );
  }, []);

  const removedPanDoc = (list, id) => {
    deleteAdvisorKycDocument(connectWithApi, id);
    const updatedList = list.filter((val) => id !== val.id);
    setPanDoc(updatedList);
  };

  const antIcon = <LoadingOutlined spin />;

  return (
    <React.Fragment>
      <Row justify="center">
        <StyledDocumentComponent span={19} offset={1}>
          PAN Card
          {panDocLoader ? (
            <StyledLoader>
              <Spin indicator={antIcon} />
              <span className="loading-text">Uploading...</span>
            </StyledLoader>
          ) : null}
        </StyledDocumentComponent>
        <StyleDocumentUploadButton span={4}>
          <Upload
            {...panCardImageUpload}
            accept="image/*,.pdf"
            showUploadList={false}
          >
            <Button size="sm-2" htmlType="button">
              Upload
            </Button>
          </Upload>
        </StyleDocumentUploadButton>

        <Col span={24}>
          {!panDocLoader ? (
            <ImageUpload
              list={panDoc}
              span={22}
              clicked={removedPanDoc}
              errorMessage={errorMessage}
            />
          ) : null}
        </Col>
        <Divider />
      </Row>
    </React.Fragment>
  );
};

export default PanUploadFiles;
