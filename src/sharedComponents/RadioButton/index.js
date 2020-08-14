import React from "react";
import { CustomRadio } from "./style";

export const RadioButton = (props) => (
  <CustomRadio {...props}>
    {props.children}
  </CustomRadio>
);

