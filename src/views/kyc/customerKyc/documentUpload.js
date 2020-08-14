import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

import { useHistory, useLocation } from "react-router-dom";

import { useInsideAuthApi } from "../../../contextProviders/apiProvider";
import { useAuth } from "../../../contextProviders/authProvider";

import { routes } from "../../../constants/routes";
import Notification from "../../../sharedComponents/Notification";

import DocumentUpload from "../customerKycForm/documentUpload";
import Title from "../customerKycForm/title";

import {
  getUploadedKycDocument,
  getFormData,
  removedImage,
  storeKycDocument,
} from "../customerKycForm/documentUpload/document";

const CustomerDocumentUpload = ({
  onFinishFailed,
  backStep,
  steps4DropDown,
  isStep,
  firstName,
  lastName,
}) => {
  const history = useHistory();
  const location = useLocation();
  const { connectWithApi } = useInsideAuthApi();
  const { updateLoggedInUserInfo } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const isDisclosureAgree = location.state
    ? location.state.disclosureAgree
    : false;

  const [isChecked, setIsChecked] = useState(isDisclosureAgree);

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

  const addressImage =
    initialValues["address-proof-image"] !== undefined
      ? initialValues["address-proof-image"]
      : [];
  const [addressProofImage, setAddressProofImage] = useState(addressImage);

  const addressProofChangedHandler = (value) => setAddressSelectedValue(value);

  function submitDocumentUploadForm(values) {
    if (isChecked && identityProofImage.length && addressProofImage.length) {
      setIsChecked(true);
      const payload = {
        data_sharing:
          location.state && location.state.dataSharing !== undefined
            ? location.state.dataSharing
            : true,
        disclosure_agree: isChecked,
      };
      setIsLoading(true);
      connectWithApi()
        .submitCustomerKycDetails(payload)
        .then((res) => {
          updateLoggedInUserInfo({
            personal_details: {
              first_name: firstName,
              last_name: lastName,
            },
            customer_transition_info: {
              kyc_submitted: true,
              kyc_status: "PENDING",
            },
          });
          history.push(routes.authRoutes.kycThankYou + "/customer");
        })
        .catch((error) => {
          setIsLoading(false);
          Notification({ type: "error", content: error.message });
        });
    } else {
      setShowErrorMessage(false);
    }
  }
  const identityProofUploadImage = {
    async onChange({ file, fileList }) {
      setIdentityProofLoader(true);
      if (file.status !== "uploading") {
        const formData = getFormData(identityProofValue, file);
        storeKycDocument(
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
          formData
        );
      }
    },
  };
  const addressProofUploadImage = {
    async onChange({ file, fileList }) {
      setAddressProofLoader(true);
      if (file.status !== "uploading") {
        const formData = getFormData(addressProofValue, file);
        storeKycDocument(
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
          formData
        );
      }
    },
  };

  useEffect(() => {
    const pictureParams = `document_type=PICTURE_ID`;
    getUploadedKycDocument(
      connectWithApi,
      "PICTURE_ID",
      setIdentityProofImage,
      setIdentityProofLoader,
      setAddressProofImage,
      setAddressProofLoader,
      pictureParams
    );
    const addressParams = `document_type=PROOF_OF_ADDRESS`;
    getUploadedKycDocument(
      connectWithApi,
      "PROOF_OF_ADDRESS",
      setIdentityProofImage,
      setIdentityProofLoader,
      setAddressProofImage,
      setAddressProofLoader,
      addressParams
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

  const removedIdProofImage = (list, id, isAddress) => {
    const params = `${id}`;
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
  const changedHandler = (event) => setIsChecked(event.target.checked);
  const handleClick = () => {
    history.push({
      pathname: routes.authRoutes.kycDisclosures,
      state: {
        dataSharing: location.state && location.state.dataSharing,
        lastPath: routes.authRoutes.kycProcess,
        disclosureAgree: isChecked,
      },
    });
  };

  return (
    <React.Fragment>
      <Row justify="center">
        <Col span={14}>
          <Title title="Document Upload " />
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
        removedIdProofImage={removedIdProofImage}
        identityProofErrorMessage={identityProofErrorMessage}
        addressProofErrorMessage={addressProofErrorMessage}
        buttonText="Submit"
        changedHandler={changedHandler}
        handleClick={handleClick}
        isChecked={isChecked}
      />
    </React.Fragment>
  );
};

export default CustomerDocumentUpload;
