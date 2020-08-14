import React from "react";
import { CustomCheckbox } from "./style";

export const Checkbox = (props) => (
  <CustomCheckbox {...props}>
    {props.children}
  </CustomCheckbox>
);

