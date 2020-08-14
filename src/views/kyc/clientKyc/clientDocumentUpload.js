import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

import { useHistory } from "react-router-dom";

import { useInsideAuthApi } from "../../../contextProviders/apiProvider";
import { routes } from "../../../constants/routes";

import { Modal } from "../../../sharedComponents/Modal";
import { Button } from "../../../sharedComponents/button";
import Notification from "../../../sharedComponents/Notification";

import DocumentUpload from "../customerKycForm/documentUpload";

import ClientName from "./clientName";
import Title from "../customerKycForm/title";

import { Message } from "../sharedComponents/style";
import {
  getUploadedKycDocument,
  getFormData,
  removedImage,
  storeClientKycDocument,
} from "../customerKycForm/documentUpload/document";

const ClientDocumentUpload = ({
  backStep,
  onFinishFailed,
  steps4DropDown,
  isStep,
  clientId,
  clientName,
  userType,
}) => {
  const history = useHistory();
  const { connectWithApi } = useInsideAuthApi();

  const [isLoading, setIsLoading] = useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(true);
  const [identityProof, setIdentityProof] = useState([]);
  const [addressProof, setAddressProof] = useState([]);

  const [identityProofValue, setIdentityProofValue] = useState();
  const [addressProofValue, setAddressProofValue] = useState();
  const [identityProofErrorMessage, setIdentityProofErrorMessage] = useState(
    false
  );
  const [addressProofErrorMessage, setAddressProofErrorMessage] = useState(
    false
  );

  let initialValues = {
    "identity-proof": "PAN Card",
    "address-proof": "Aadhar Card",
  };

  const [addressSelectedValue, setAddressSelectedValue] = useState(
    "Aadhaar card"
  );
  const identityImage =
    initialValues["identity-proof-image"] !== undefined
      ? initialValues["identity-proof-image"]
      : [];
  const [identityProofImage, setIdentityProofImage] = useState(identityImage);
  const [identityProofLoader, setIdentityProofLoader] = useState(true);
  const [addressProofLoader, setAddressProofLoader] = useState(true);

  const [infoModalVisible, setInfoModalVisible] = useState(false);

  const infoModalHandleOK = () => {
    setInfoModalVisible(false);
    history.push(routes.authRoutes.clientList);
  };

  const addressImage =
    initialValues["address-proof-image"] !== undefined
      ? initialValues["address-proof-image"]
      : [];
  const [addressProofImage, setAddressProofImage] = useState(addressImage);

  const addressProofChangedHandler = (value) => setAddressSelectedValue(value);

  function submitDocumentUploadForm() {
    setIsLoading(true);
    if (identityProofImage.length && addressProofImage.length) {
      const payload = {
        client_id: clientId,
      };
      connectWithApi()
        .submitClientKycDetails(payload, clientId)
        .then((res) => {
          setInfoModalVisible(true);
        })
        .catch((error) => {
          setIsLoading(false);
          Notification({ type: "error", content: error.message });
        });
    } else {
      setShowErrorMessage(false);
    }
  }
  const removedIdProofImage = (list, id, isAddress) => {
    const params = `${id}?client_id=${clientId}`;
    removedImage(
      list,
      id,
      isAddress,
      setAddressProofImage,
      setIdentityProofImage,
      connectWithApi,
      params
    );
  };

  const identityProofUploadImage = {
    async onChange({ file, fileList }) {
      setIdentityProofLoader(true);
      if (file.status !== "uploading") {
        const formData = getFormData(identityProofValue, file);
        formData.append("client_id", clientId);
        formData.append("kyc_type", userType);
        storeClientKycDocument(
          connectWithApi,
          file,
          identityProofValue,
          setIdentityProofImage,
          identityProofImage,
          setIdentityProofLoader,
          setAddressProofImage,
          addressProofImage,
          setAddressProofLoader,
          setIdentityProofErrorMessage,
          setAddressProofErrorMessage,
          formData,
          clientId
        );
      }
    },
  };
  const addressProofUploadImage = {
    async onChange({ file, fileList }) {
      setAddressProofLoader(true);
      if (file.status !== "uploading") {
        const formData = getFormData(addressProofValue, file);
        formData.append("client_id", clientId);
        formData.append("kyc_type", userType);
        storeClientKycDocument(
          connectWithApi,
          file,
          addressProofValue,
          setIdentityProofImage,
          identityProofImage,
          setIdentityProofLoader,
          setAddressProofImage,
          addressProofImage,
          setAddressProofLoader,
          setIdentityProofErrorMessage,
          setAddressProofErrorMessage,
          formData,
          clientId
        );
      }
    },
  };
  useEffect(() => {
    const pictureId = `document_type=PICTURE_ID&client_id=${clientId}`;
    getUploadedKycDocument(
      connectWithApi,
      "PICTURE_ID",
      setIdentityProofImage,
      setIdentityProofLoader,
      setAddressProofImage,
      setAddressProofLoader,
      pictureId
    );
    const addressId = `document_type=PROOF_OF_ADDRESS&client_id=${clientId}`;
    getUploadedKycDocument(
      connectWithApi,
      "PROOF_OF_ADDRESS",
      setIdentityProofImage,
      setIdentityProofLoader,
      setAddressProofImage,
      setAddressProofLoader,
      addressId
    );
  }, []);

  useEffect(() => {
    if (steps4DropDown) {
      setIdentityProof(steps4DropDown?.identity_proof);
      setAddressProof(steps4DropDown?.address_proof);
      setIdentityProofValue(steps4DropDown?.identity_proof[0].value);
      setAddressProofValue(steps4DropDown?.address_proof[0].value);
    }
  }, [isStep]);

  return (
    <React.Fragment>
      <Row justify="center">
        <Col span={14}>
          <ClientName name={clientName} />
          <Title className="client-kyc" title="Document Upload " />
        </Col>
      </Row>

      <DocumentUpload
        onFinishFailed={onFinishFailed}
        backStep={backStep}
        submitDocumentUploadForm={submitDocumentUploadForm}
        initialValues={initialValues}
        identityProof={identityProof}
        identityProofUploadImage={identityProofUploadImage}
        identityProofLoader={identityProofLoader}
        identityProofImage={identityProofImage}
        showErrorMessage={showErrorMessage}
        addressProof={addressProof}
        addressProofChangedHandler={addressProofChangedHandler}
        addressProofUploadImage={addressProofUploadImage}
        addressSelectedValue={addressSelectedValue}
        addressProofLoader={addressProofLoader}
        addressProofImage={addressProofImage}
        isLoading={isLoading}
        isClient={true}
        removedIdProofImage={removedIdProofImage}
        identityProofErrorMessage={identityProofErrorMessage}
        addressProofErrorMessage={addressProofErrorMessage}
        buttonText="Save for Review"
      />
      <Modal
        title="Message"
        visible={infoModalVisible}
        onCancel={infoModalHandleOK}
        centered={true}
        footer={[
          <Button key="back" size="md-2" onClick={() => infoModalHandleOK()}>
            OK
          </Button>,
        ]}
      >
        <Message>The KYC has been saved</Message>
      </Modal>
    </React.Fragment>
  );
};

export default ClientDocumentUpload;
