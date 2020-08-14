import React from "react";
import { Row, Col } from "antd";

import { defaultValues } from "../../../../constants/defaultValues";

import { Button } from "../../../../sharedComponents/button";
import { Modal } from "../../../../sharedComponents/Modal";
import OtpInputBoxes from "../../../../sharedComponents/OtpInputBoxes";
import OtpTimer from "../../../../sharedComponents/OtpTimer";

import { StyledFormItem, SubHeading, GrayLink } from "../style";

const MobileVerificationModal = ({
  isPhoneNumberModalVisible,
  closeModalHandler,
  otpVerification,
  confirmPhoneLoader,
  resendLinkDisabled,
  showPhoneVerificationModal,
  otpValue,
  otpChangedHandler,
  otpError,
  onTimerComplete,
  enableOTP,
}) => (
  <Modal
    title="Mobile Verification"
    visible={isPhoneNumberModalVisible}
    onCancel={closeModalHandler}
    centered={true}
    maskClosable={false}
    destroyOnClose={true}
    footer={[
      <Button
        size="md-2"
        outlined={true}
        htmlType="button"
        onClick={() => closeModalHandler()}
      >
        Cancel
      </Button>,
      <Button
        size="md-2"
        htmlType="submit"
        loading={confirmPhoneLoader}
        onClick={() => otpVerification(otpValue)}
      >
        Confirm
      </Button>,
    ]}
  >
    <Row justify="center">
      <SubHeading>{defaultValues.kycOtpMessage}</SubHeading>
      <Col>
        <StyledFormItem
          name="otp"
          rules={[
            {
              len: defaultValues.otpLength,
              required: true,
              message: "Please enter the otp",
            },
          ]}
        >
          <OtpInputBoxes
            onChange={(e) => otpChangedHandler(e)}
            value={otpValue}
            hasErrored={otpError ? true : false}
          />
        </StyledFormItem>
        <GrayLink
          className={resendLinkDisabled ? "disabled-click-event" : null}
          onClick={() => showPhoneVerificationModal("re-send")}
        >
          Re-Send the code
          <OtpTimer onTimerComplete={onTimerComplete} enable={enableOTP} />
        </GrayLink>
      </Col>
    </Row>
  </Modal>
);

export default MobileVerificationModal;
