export const phoneErrorMessage = "Please verify your mobile number";
export const phoneFieldName = "phone_number";

export const formatePhoneNumber = (phoneNumber) =>
  phoneNumber?.replace(/\s/g, "").replace("-", "");

export const verifyMobileNumber = (
  phoneNumber,
  errorMessage,
  fieldName,
  loggedInUser,
  setIsNumberChanged,
  setDisabledVerifyButton,
  form,
  personalDetails
) => {
  const dbPhoneNumber =
    personalDetails === undefined
      ? loggedInUser.personal_details?.phone_number
      : personalDetails?.phone_number;
  const frontEndPhoneNumber = formatePhoneNumber(phoneNumber);
  if (
    dbPhoneNumber === frontEndPhoneNumber ||
    (dbPhoneNumber && frontEndPhoneNumber === undefined)
  ) {
    setIsNumberChanged(false);
    setDisabledVerifyButton(true);
  } else {
    addRemoveFormError(fieldName, false, errorMessage, form);
    setDisabledVerifyButton(false);
  }
};

export const addRemoveFormError = (
  fieldName,
  validatingStatus,
  errorMessage,
  form
) => {
  form.setFields([
    {
      name: fieldName,
      validating: validatingStatus,
      errors: [errorMessage],
    },
  ]);
};

export const showPhoneVerificationModal = (
  phoneNumber,
  connectWithApi,
  setIsPhoneNumberModalVisible,
  setOtpError,
  setVerifyPhoneLoader,
  fromWhere,
  setEnableOTP,
  setResendLinkDisabled,
  setIsMobileNumberVerified,
  setIsNumberChanged,
  form,
  fieldName
) => {
  if (fromWhere === "view-botton") {
    setVerifyPhoneLoader(true);
  } else {
    setEnableOTP(true);
    setResendLinkDisabled(true);
  }
  const mobileNumber = formatePhoneNumber(phoneNumber);
  const reqBody = {
    phone_number: mobileNumber,
  };
  connectWithApi()
    .resendCodeInPhone(reqBody)
    .then((res) => {
      setIsPhoneNumberModalVisible(true);
      setVerifyPhoneLoader(false);
    })
    .catch((error) => {
      if (
        error &&
        error["error_key"] &&
        error["error_key"].toLowerCase() === "mobile_already_verified"
      ) {
        setIsMobileNumberVerified(true);
        setIsNumberChanged(false);
      } else {
        addRemoveFormError(fieldName, false, error.message, form);
      }
      setOtpError(false);
      setVerifyPhoneLoader(false);
      setResendLinkDisabled(false);
    });
};

export const mobileNumberVerification = (
  otp,
  phoneNumber,
  connectWithApi,
  setIsPhoneNumberModalVisible,
  setOtpError,
  setIsMobileNumberVerified,
  setIsNumberChanged,
  setConfirmPhoneLoader,
  form,
  updateLoggedInUserInfo,
  setMobileVerificationStatus,
  loggedInUser,
  fieldName,
  setDisabledVerifyButton,
  errorMessage
) => {
  setConfirmPhoneLoader(true);
  const mobileNumber = formatePhoneNumber(phoneNumber);
  const reqBody = {
    phone_number: mobileNumber,
    mobile_verification_otp: otp ? otp.toString() : null,
  };
  connectWithApi()
    .verifyPhone(reqBody)
    .then((res) => {
      setIsPhoneNumberModalVisible(false);
      setIsMobileNumberVerified(true);
      setIsNumberChanged(false);
      setConfirmPhoneLoader(false);
      setMobileVerificationStatus(true);
      const personalDetails = loggedInUser.personal_details;
      const phoneNumberObj = {
        phone_number: mobileNumber,
      };
      const updatePersonalDetails = { ...personalDetails, ...phoneNumberObj };
      updateLoggedInUserInfo({
        personal_details: {
          ...updatePersonalDetails,
        },
      });
      verifyMobileNumber(
        phoneNumber,
        errorMessage,
        fieldName,
        loggedInUser,
        setIsNumberChanged,
        setDisabledVerifyButton,
        form,
        updatePersonalDetails
      );
      addRemoveFormError(fieldName, true, "", form);
    })
    .catch((error) => {
      setOtpError(true);
      setConfirmPhoneLoader(false);
      addRemoveFormError("otp", false, error.message, form);
    });
};
