import React from "react";
import "react-phone-input-2/lib/style.css";

import PhoneInput from "react-phone-input-2";

import { StyledPhoneInput } from "./style";

const PhoneNumber = (props) => (
  <StyledPhoneInput>
    <PhoneInput {...props} />
  </StyledPhoneInput>
);

export default PhoneNumber;
