import React from "react";
import { Form, Row, Col, Upload } from "antd";

import Loader from "../../../../sharedComponents/Loader";
import { Button } from "../../../../sharedComponents/button";
import { Checkbox } from "../../../../sharedComponents/Checkbox";

import SelectComponent from "../../sharedComponents/selectComponent";

import { CustomLink, CustomCol } from "./style";
import {
  StyledFormItem,
  StyledRightCol,
  StyledBottomButton,
  FloatRightButtonCol,
  ErrorMessage,
} from "../../sharedComponents/style";
import { UploadImageMessage } from "../../sharedComponents/imageUpload/style";

import ImageUpload from "./imageUpload";

const DocumentUpload = ({
  onFinishFailed,
  backStep,
  submitDocumentUploadForm,
  initialValues,
  identityProof,
  identityProofUploadImage,
  identityProofLoader,
  identityProofImage,
  showErrorMessage,
  addressProof,
  addressProofChangedHandler,
  addressProofUploadImage,
  addressSelectedValue,
  addressProofLoader,
  addressProofImage,
  isLoading,
  isClient,
  removedIdProofImage,
  identityProofErrorMessage,
  addressProofErrorMessage,
  buttonText,
  changedHandler,
  handleClick,
  isChecked
}) => {
  const errorMessageTemplate = (
    <Row justify="center">
      <Col xs={{ span: 24 }} lg={{ span: 13 }}>
        <ErrorMessage className="error-message-redirection">
          Please upload image
        </ErrorMessage>
      </Col>
    </Row>
  );

  return (
    <Form
      layout="vertical"
      onFinish={submitDocumentUploadForm}
      initialValues={initialValues}
      onFinishFailed={onFinishFailed}
    >
      <Row justify="center">
        <Col xs={{ span: 18 }} lg={{ span: 9 }}>
          <SelectComponent
            placeholder="Select"
            name="identity-proof"
            label="Identity Proof"
            list={identityProof}
            isJsonObject={true}
            className="document-upload-select"
          />
        </Col>
        <StyledRightCol xs={{ span: 4 }} lg={{ span: 4 }}>
          <StyledFormItem label="&nbsp;" name="identity-proof-image">
            <Upload
              {...identityProofUploadImage}
              showUploadList={false}
              accept="image/*,.pdf"
            >
              <Button size="sm-2" htmlType="button">
                Upload
              </Button>
            </Upload>
          </StyledFormItem>
        </StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 13 }}>
          <UploadImageMessage>
            Must contain your name and picture
          </UploadImageMessage>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Loader size="large" spinning={identityProofLoader} />
        </Col>
      </Row>
      {!identityProofLoader ? (
        <ImageUpload
          isAddress={false}
          list={identityProofImage}
          clicked={removedIdProofImage}
          errorMessage={identityProofErrorMessage}
        />
      ) : null}
      {!identityProofImage.length && !showErrorMessage
        ? errorMessageTemplate
        : null}
      <Row justify="center">
        <Col xs={{ span: 18 }} lg={{ span: 9 }}>
          <SelectComponent
            placeholder="Select"
            list={addressProof}
            name="address-proof"
            label="Address Proof"
            isJsonObject={true}
            className="document-upload-select"
            changedHandler={addressProofChangedHandler}
          />
        </Col>
        <StyledRightCol xs={{ span: 4 }} lg={{ span: 4 }}>
          <StyledFormItem label="&nbsp;" name="address-proof-image">
            <Upload
              {...addressProofUploadImage}
              showUploadList={false}
              accept="image/*,.pdf"
            >
              <Button size="sm-2" htmlType="button">
                Upload
              </Button>
            </Upload>
          </StyledFormItem>
        </StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 13 }}>
          <UploadImageMessage>
            If your {addressSelectedValue} has your name on one side and address
            on the other side, please upload scans of both sides
          </UploadImageMessage>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Loader size="large" spinning={addressProofLoader} />
        </Col>
      </Row>
      {!addressProofLoader ? (
        <ImageUpload
          isAddress={true}
          list={addressProofImage}
          clicked={removedIdProofImage}
          errorMessage={addressProofErrorMessage}
        />
      ) : null}
      {!addressProofImage.length && !showErrorMessage
        ? errorMessageTemplate
        : null}

      <Row justify="center">
        <CustomCol
          xs={{ span: 24 }}
          lg={{ span: 13 }}
          className={isClient ? "disabled" : null}
        >
          <Checkbox onChange={changedHandler} checked={isChecked} />
          <CustomLink onClick={handleClick}>
            I agree to the disclosures
          </CustomLink>
          {!isChecked && !showErrorMessage ? (
            <ErrorMessage className="agreement-error error-message-redirection">
              Should accept agreement
            </ErrorMessage>
          ) : null}
        </CustomCol>
      </Row>
      <StyledBottomButton>
        <FloatRightButtonCol span={12}>
          <Button size="md-1" outlined={true} onClick={backStep}>
            Back
          </Button>
        </FloatRightButtonCol>
        <Col span={11}>
          <Button loading={isLoading} htmlType="submit" size="md-1">
            {buttonText}
          </Button>
        </Col>
      </StyledBottomButton>
    </Form>
  );
};

export default DocumentUpload;
